import e from 'express'
import { prisma } from '../lib/prisma';
import { InternalServerError, InvalidInputError } from '../errors/errors';

interface CourseQuery {
  name?: string,
  page?: number,
  limit?: number
}
const getAllCourses = async (req: e.Request<any, any, any, CourseQuery>, res: e.Response) => {
  const query = req.query;
  const obj: any = {};
  if (query.name) {
    obj.name = query.name;
  }
  obj.skip = query.page ? query.page - 1 : 0;
  obj.limit = query.limit ? query.limit : 20;
  const courses = await prisma.courses.findMany({
    where: {
      title: obj.name ? obj.name : ''
    },
    take: obj.limit,
    skip: obj.skip * obj.limit,
  });

  res.status(200).json({
    courses
  });
}

const getCourse = async (req: e.Request<{
  course_id: string
}>, res: e.Response) => {
  const { course_id } = req.params;
  const course = await prisma.courses.findUnique({
    where: {
      course_id: course_id
    }
  });
  if (!course) {
    throw new InternalServerError("Your Course Id is invalid or course cannot be found");
  }
  res.status(200).json({
    course,
  });
}

interface CourseBody {
  title?: string,
  course_image?: string,
  user_id?: string,
  course_level?: 'beginner' | 'intermediate' | 'advanced',
  description?: string,
  learning_outcomes?: string[],
  skills?: string[],
  tools?: string[],
  discount?: number,
  benefits?: string,
  price?: number,
};
const addCourse = async (req: e.Request<any, any, CourseBody>, res: e.Response) => {
  const { title, course_image, user_id, course_level, description,
    learning_outcomes, price, skills, tools, discount, benefits } = req.body;

  const obj: any = {};
  if (!title || !course_image || !user_id || !course_level || !description || !learning_outcomes) {
    throw new InvalidInputError("Necessary Information must be provided");
  }
  if (title) obj.title = title;
  if (course_image) obj.course_image = course_image;
  if (user_id) obj.user_id = user_id;
  if (course_level) obj.course_level = course_level;
  if (learning_outcomes) obj.learning_outcomes = learning_outcomes;
  if (skills) obj.skills = skills;
  if (tools) obj.tools = tools;
  if (discount) obj.discount = discount;
  if (benefits) obj.benefits = benefits;
  if (price) obj.price = price;

  const course = prisma.courses.create({
    data: obj
  });
  if (!course) {
    throw new InternalServerError("Unable to Create a new Course");
  }
  res.status(200).json({
    course
  });
}

const updateCourse = async (req: e.Request<{ course_id: string }, any, CourseBody>, res: e.Response) => {
  const { title, course_image, user_id, course_level, description,
    learning_outcomes, price, skills, tools, discount, benefits } = req.body;
  const { course_id } = req.params;
  const obj: any = {};
  if (!title || !course_image || !user_id || !course_level || !description || !learning_outcomes) {
    throw new InvalidInputError("Necessary Information must be provided");
  }
  if (title) obj.title = title;
  if (course_image) obj.course_image = course_image;
  if (user_id) obj.user_id = user_id;
  if (course_level) obj.course_level = course_level;
  if (learning_outcomes) obj.learning_outcomes = learning_outcomes;
  if (skills) obj.skills = skills;
  if (tools) obj.tools = tools;
  if (discount) obj.discount = discount;
  if (benefits) obj.benefits = benefits;
  if (price) obj.price = price;

  const updated_course = await prisma.courses.update({
    where: {
      course_id: course_id
    },
    data: obj
  });

  if (!updated_course) {
    throw new InternalServerError("Unable to update course with ID " + course_id);
  }

  res.status(200).json({
    updated_course
  });
}

const deleteCourse = async (req: e.Request<{ course_id: string }>, res: e.Response) => {
  const { course_id } = req.params;

  const deleted_course = await prisma.courses.delete({
    where: {
      course_id: course_id
    }
  });
  if (!deleted_course) {
    throw new InternalServerError("Unable to delte the course");
  }

  res.status(200).json({
    deleted_course
  });
}

export { getAllCourses, getCourse, addCourse, updateCourse, deleteCourse }; 
