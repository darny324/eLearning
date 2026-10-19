import { AuthenticationError, AuthorizationError, InternalServerError, InvalidInputError, NotFoundError } from "../errors/errors";
import { prisma } from "../lib/prisma";
import { getJwtSecret } from "../lib/jwt";
import e from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Prisma } from '../generated/prisma/client';
import { isUuid } from '../lib/validation';

interface UserBody {
  name?: string,
  email?: string,
  password?: string,
  type?: 'student' | 'instructor',
  profile_image?: string,
}
const create_user = async (req: e.Request<any, any, UserBody>, res: e.Response) => {
  const { name, email, password, type, profile_image } = req.body;
  if (!name || !email || !password) {
    throw new InvalidInputError("Name, Email or Password must be provided");
  }
  if (type && type !== 'student') {
    throw new AuthorizationError("New accounts must be created as students");
  }
  const jwtSecret = getJwtSecret();
  const salt = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(password, salt);
  const data: Prisma.usersUncheckedCreateInput = {
    name,
    email,
    password: hash_password,
    type: 'student',
    ...(profile_image ? { profile_image } : {})
  };
  const new_user = await prisma.users.create({
    data,
    omit: {
      password: true
    }
  });

  const token: string = jwt.sign({
    user_id: new_user.user_id,
    name: new_user.name,
    type: new_user.type
  }, jwtSecret, { expiresIn: '30d' });
  res.status(201).json({
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
  const jwtSecret = getJwtSecret();

  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
    select: {
      password: true,
    }
  });
  if ( !user ) {
    throw new AuthenticationError("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AuthenticationError("Invalid credentials");
  }

  const User = await prisma.users.findUnique({
    where: {
      email: email,
    },
    omit: {
      password: true
    }
  })
  if (!User) {
    throw new NotFoundError("User not found");
  }

  const token: string = jwt.sign({
    user_id: User.user_id,
    name: User.name,
    type: User.type ?? 'student'
  }, jwtSecret, { expiresIn: '30d' });
  res.status(200).json({
    user: User, token
  });
}

const getCoursesByUser = async (req: e.Request, res: e.Response) => {
  const { user_id } = req.body.user;
  if (!user_id) {
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
  const { user_id } = req.body.user;
  const { course_id } = req.params;

  if (!user_id || !isUuid(course_id)) {
    throw new InvalidInputError("course_id and authenticated user are required");
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
            },
            orderBy: { module_order: 'asc' }
          }
        }
      }
    }
  });
  if (!enrollment) {
    throw new NotFoundError("Course enrollment not found");
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

  res.status(200).json({
    course,
    record,
  })
}

const getLessonByUser = async (req: e.Request, res: e.Response) => {
  const { user_id } = req.body.user;
  const { module_id: module_id_param } = req.params as { module_id: string };

  if (!user_id) {
    throw new AuthenticationError("Error in authenticating");
  }

  const module_id = Number(module_id_param);
  if (!Number.isSafeInteger(module_id) || module_id < 1) {
    throw new InvalidInputError("Module ID must be a positive integer");
  }

  const module = await prisma.modules.findUnique({
    where: {
      module_id: module_id,
    },
    select: {
      module_id: true,
      title: true,
      course_id: true,
    }
  });
  if (!module?.course_id) {
    throw new NotFoundError("Module not found");
  }
  const enrollment = await prisma.enrollment.findFirst({
    where: { user_id, course_id: module.course_id }
  });
  if (!enrollment) {
    throw new NotFoundError("Enrolled module not found");
  }
  const lessons = await prisma.lessons.findMany({
    where: {
      module_id: module_id,
    }
  })
  res.status(200).json({
    module_title: module.title,
    lessons
  });
}

const enrollInCourse = async (req: e.Request, res: e.Response) => {
  const { course_id } = req.body;
  const { user_id } = req.body.user;
  if (req.body.user.type !== 'student') {
    throw new AuthorizationError("Only students can enroll in courses");
  }
  if (!isUuid(course_id) || !user_id) {
    throw new InvalidInputError("course_id must be provided");
  }
  const course = await prisma.courses.findUnique({
    where: { course_id },
    select: {
      user_id: true,
      modules: {
        orderBy: { module_order: 'asc' },
        select: {
          module_id: true,
          lessons: {
            orderBy: { lesson_order: 'asc' },
            select: { lesson_id: true },
            take: 1
          }
        },
        take: 1
      }
    }
  });
  if (!course) {
    throw new NotFoundError("Course not found");
  }
  const firstModule = course.modules[0];
  const instructor_id = course.user_id;

  const new_enrollment = await prisma.$transaction(async (transaction) => {
    const enrollment = await transaction.enrollment.create({
      data: { course_id, user_id, instructor_id }
    });
    const record = await transaction.records.create({
      data: {
        course_id,
        user_id,
        current_module_id: firstModule?.module_id ?? null,
        current_lesson_id: firstModule?.lessons[0]?.lesson_id ?? null,
      }
    });
    return { enrollment, record };
  });
  res.json({
    new_enrollment
  });

}

const giveReview = async (req: e.Request, res: e.Response) => {
  const { review, rating, course_id } = req.body;
  const { user_id } = req.body.user;

  if (!isUuid(course_id)) {
    throw new InvalidInputError("course_id must be a UUID");
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new InvalidInputError("rating must be an integer from 1 to 5");
  }
  if (typeof review !== 'string') {
    throw new InvalidInputError("review must be a string");
  }
  const enrollment = await prisma.enrollment.findFirst({
    where: { user_id, course_id }
  });
  if (!enrollment) {
    throw new AuthorizationError("You must be enrolled to review this course");
  }

  const new_review = await prisma.reviews.create({
    data: {
      user_id,
      course_id,
      review_message: review,
      rating,
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

  if (typeof review_id !== 'string' || !/^\d+$/.test(review_id)) {
    throw new InvalidInputError("review_id must be a positive integer string");
  }

  const id = BigInt(review_id);
  const review = await prisma.reviews.findFirst({
    where: { review_id: id, user_id: req.body.user.user_id }
  });
  if (!review) {
    throw new NotFoundError("Review not found");
  }
  const deletedReview = await prisma.reviews.delete({ where: { review_id: id } });
  res.json({
    deletedReview
  })
}

export { create_user, Login, getCoursesByUser, getCourseByUser, getLessonByUser, enrollInCourse, giveReview, deleteReview };
