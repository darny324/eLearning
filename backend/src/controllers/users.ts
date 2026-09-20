import { AuthenticationError, InternalServerError, InvalidInputError } from "../errors/errors";
import { prisma } from "../lib/prisma";
import e from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

interface UserBody {
  name: string | null,
  email: string | null,
  password: string | null,
  type: 'student' | 'instructor' | null,
  profile_image: string | null,
}
const create_user = async (req: e.Request<any, any, UserBody>, res: e.Response) => {
  const { name, email, password, type, profile_image } = req.body;
  if (!name || !email || !password) {
    throw new InvalidInputError("Name, Email or Password must be provided");
  }
  const obj: any = {};
  obj.name = name;
  obj.email = email;
  const salt = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(password, salt);
  obj.password = hash_password;
  if (type) obj.type = type;
  if (profile_image) obj.profile_image = profile_image;
  const new_user = await prisma.users.create({
    data: obj,
  });

  const token: string = jwt.sign({
    user_id: new_user.user_id,
    name: new_user.name
  }, process.env.JWT_SECRET as string, { expiresIn: '30d' });


  if (!new_user) {
    throw new InternalServerError("Unable to create new users");
  }
  res.status(200).json({
    new_user,
    token
  });
}

interface LoginBody {
  email: string,
  password: string
};
const Login = async (req: e.Request<any, any, LoginBody>, res: e.Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new InvalidInputError("Both Email and Password Must be provided");
  }
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);

  const user = await prisma.users.findUnique({
    where: {
      email: email,
      password: hashed_password
    }
  });
  if (!user) {
    res.status(200).json({
      user: null,
      message: "user not found",
    });
    return;
  }

  const token: string = jwt.sign({
    user_id: user.user_id,
    name: user.name
  }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
  res.status(200).json({
    user, token
  });
}

const getCoursesByUser = async (req: e.Request, res: e.Response) => {
  const { user_id, name } = req.body.user;
  if (!user_id || !name) {
    throw new AuthenticationError("Error in authenticating User");
  }
  const enrollments = await prisma.enrollment.findMany({
    where: {
      user_id: user_id,
    },
    select: {
      courses: {
        select: {
          course_id: true,
          title: true,
          course_image: true,
          users: {
            select: {
              user_id: true,
              name: true
            }
          },
          modules: {
            select: {
              module_order: true,
              module_id: true,
            },
            orderBy: {
              module_order: 'asc'
            }
          }
        }
      }
    }
  });
  if (!enrollments) {
    throw new InternalServerError("Error in Retrieving enrollments");
  }

  const courses = enrollments.map((e) => e.courses);
  const records = await prisma.records.findMany({
    where: {
      user_id: user_id,
    },
    select: {
      current_module_id: true,
    }
  })

  if (!records) {
    throw new InternalServerError("Error in retrieving student records");
  }

  res.status(200).json({
    courses: courses,
    records: records
  });
}

const getCourseByUser = async (req: e.Request<{ course_id: string }>, res: e.Response) => {
  const { user_id, name } = req.body.user;
  const { course_id } = req.params;

  if (!user_id || !name || !course_id) {
    throw new InvalidInputError("All course_id, user_id and name must be provided");
  }

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      AND: { user_id: user_id, course_id: course_id }
    },
    select: {
      courses: {
        select: {
          title: true,
          course_id: true,
          modules: {
            select: {
              module_id: true,
              module_order: true,
              title: true,
            }
          }
        }
      }
    }
  });
  if (!enrollment) {
    throw new InternalServerError("Error in retriveing enrollment ");
  }

  const course = enrollment.courses;
  const record = await prisma.records.findFirst({
    where: {
      AND: { user_id: user_id, course_id: course_id }
    },
    select: {
      current_module_id: true,
      current_lesson_id: true,
    }
  });

  if (!record) {
    throw new InternalServerError("Unable to retrieving records");
  }
  res.status(200).json({
    course,
    record,
  })
}

const getLessonByUser = async (req: e.Request, res: e.Response) => {
  const { user_id, name } = req.body.user;
  const { module_id } = req.params;

  if (!user_id || !name) {
    throw new AuthenticationError("Error in authenticating");
  }

  if (!module_id || typeof module_id !== 'number') {
    throw new InvalidInputError("ModuleId must be provided");
  }

  const module = await prisma.modules.findUnique({
    where: {
      module_id: module_id,
    },
    select: {
      module_id: true,
      title: true,
    }
  });
  if (!module) {
    throw new InternalServerError("Error in Retrieving Modules");
  }
  const lessons = await prisma.lessons.findMany({
    where: {
      module_id: module_id,
    }
  })
  if (!lessons) {
    throw new InternalServerError("There are no lessons or Error in retrieving lessons");
  }
  res.status(200).json({
    module_title: module.title,
    lessons
  });
}

const enrollInCourse = async (req: e.Request, res: e.Response) => {
  const { course_id, instructor_id } = req.body;
  const { user_id } = req.body.user;
  if (!course_id || !instructor_id || !user_id) {
    throw new InvalidInputError("course_id, instructor_id and user_id must be provided");
  }

  const new_enrollment = await prisma.enrollment.create({
    data: {
      course_id, user_id, instructor_id
    }
  });
  if (!new_enrollment) {
    throw new InternalServerError("Error in creating new enrollments");
  }
  res.json({
    new_enrollment
  });

}

const giveReview = async (req: e.Request, res: e.Response) => {
  const { review, rating, course_id } = req.body;
  const { user_id } = req.body.user;

  if (!course_id || !user_id) {
    throw new InternalServerError("course_id and user_id are not provided");
  }

  const new_review = await prisma.reviews.create({
    data: {
      user_id,
      course_id,
      review_message: review ? review : "",
      rating: rating ? rating : 1,
    }
  });
  if (!new_review) {
    throw new InternalServerError("Error in creating reviews");
  }

  res.json({
    new_review
  });
}

const deleteReview = async (req: e.Request, res: e.Response) => {
  const { review_id } = req.body;

  if (!review_id) {
    throw new InvalidInputError("review_id must be provided");
  }

  const deletedReview = await prisma.reviews.delete({
    where: {
      review_id
    }
  });
  if (!deletedReview) {
    throw new InternalServerError("Error in deleting a review");
  }
  res.json({
    deletedReview
  })
}

export { create_user, Login, getCoursesByUser, getCourseByUser, getLessonByUser, enrollInCourse, giveReview, deleteReview };
