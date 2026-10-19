import e from 'express';
import { Prisma } from '../generated/prisma/client';
import { AuthorizationError, InvalidInputError, NotFoundError } from '../errors/errors';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequestBody } from '../types/auth';
import { isUuid } from '../lib/validation';

interface CourseQuery {
  name?: string;
  page?: string;
  limit?: string;
}

interface CourseBody {
  title?: string;
  course_image?: string;
  course_level?: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
  learning_outcomes?: string[];
  skills?: string[];
  tools?: string[];
  discount?: number;
  benefits?: string;
  price?: number;
}

const assertCourseOwner = async (course_id: string, user_id: string) => {
  if (!isUuid(course_id)) {
    throw new InvalidInputError('course_id must be a UUID');
  }
  const course = await prisma.courses.findFirst({
    where: { course_id, user_id },
    select: { course_id: true }
  });
  if (!course) {
    throw new NotFoundError('Course not found');
  }
};

const getAllCourses = async (req: e.Request<any, any, any, CourseQuery>, res: e.Response) => {
  const page = req.query.page === undefined ? 1 : Number(req.query.page);
  const limit = req.query.limit === undefined ? 20 : Number(req.query.limit);
  if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) {
    throw new InvalidInputError('Page must be positive and limit must be between 1 and 100');
  }

  const courses = await prisma.courses.findMany({
    where: req.query.name ? { title: { contains: req.query.name, mode: 'insensitive' } } : undefined,
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { title: 'asc' }
  });

  res.status(200).json({ courses, page, limit });
};

const getCourse = async (req: e.Request<{ course_id: string }>, res: e.Response) => {
  if (!isUuid(req.params.course_id)) {
    throw new InvalidInputError('course_id must be a UUID');
  }
  const course = await prisma.courses.findUnique({
    where: { course_id: req.params.course_id }
  });
  if (!course) {
    throw new NotFoundError('Course not found');
  }
  res.status(200).json({ course });
};

const getCourseReviews = async (req: e.Request<{ course_id: string }>, res: e.Response) => {
  if (!isUuid(req.params.course_id)) {
    throw new InvalidInputError('course_id must be a UUID');
  }
  const course = await prisma.courses.findUnique({
    where: { course_id: req.params.course_id },
    select: { course_id: true }
  });
  if (!course) {
    throw new NotFoundError('Course not found');
  }
  const reviews = await prisma.reviews.findMany({
    where: { course_id: course.course_id },
    select: {
      review_id: true,
      rating: true,
      review_message: true,
      users: {
        select: { user_id: true, name: true, profile_image: true }
      }
    },
    orderBy: { review_id: 'desc' }
  });
  res.status(200).json({ reviews });
};

const addCourse = async (req: e.Request<any, any, AuthenticatedRequestBody<CourseBody>>, res: e.Response) => {
  const { title, course_image, course_level, description, learning_outcomes,
    price, skills, tools, discount, benefits } = req.body;
  const user_id = req.body.user.user_id;
  if (typeof title !== 'string' || !title.trim() ||
    typeof course_image !== 'string' || !course_image.trim() ||
    !['beginner', 'intermediate', 'advanced'].includes(course_level ?? '') ||
    typeof description !== 'string' ||
    (benefits !== undefined && typeof benefits !== 'string') ||
    !Array.isArray(learning_outcomes) || learning_outcomes.length === 0 ||
    !learning_outcomes.every((value) => typeof value === 'string') ||
    (skills !== undefined && (!Array.isArray(skills) || !skills.every((value) => typeof value === 'string'))) ||
    (tools !== undefined && (!Array.isArray(tools) || !tools.every((value) => typeof value === 'string')))) {
    throw new InvalidInputError('Title, image, level, description, and learning outcomes are required');
  }
  if (price !== undefined && (!Number.isFinite(price) || price < 0)) {
    throw new InvalidInputError('Price must be a non-negative number');
  }
  if (discount !== undefined && (!Number.isFinite(discount) || discount < 0 || discount > 1)) {
    throw new InvalidInputError('Discount must be between 0 and 1');
  }

  const data: Prisma.coursesUncheckedCreateInput = {
    title,
    user_id,
    course_image,
    course_level,
    description,
    learning_outcomes,
    skills: skills ?? [],
    tools: tools ?? [],
    ...(price === undefined ? {} : { price }),
    ...(discount === undefined ? {} : { discount }),
    ...(benefits === undefined ? {} : { benefits })
  };
  const course = await prisma.courses.create({ data });
  res.status(201).json({ course });
};

const updateCourse = async (req: e.Request<{ course_id: string }, any, AuthenticatedRequestBody<CourseBody>>, res: e.Response) => {
  const { title, course_image, course_level, description,
    learning_outcomes, price, skills, tools, discount, benefits } = req.body;
  const { course_id } = req.params;
  const user_id = req.body.user.user_id;
  if (!isUuid(course_id)) {
    throw new InvalidInputError('course_id must be a UUID');
  }
  const data: Prisma.coursesUncheckedUpdateInput = {};
  if (title !== undefined) data.title = title;
  if (course_image !== undefined) data.course_image = course_image;
  if (course_level !== undefined) data.course_level = course_level;
  if (description !== undefined) data.description = description;
  if (learning_outcomes !== undefined) data.learning_outcomes = learning_outcomes;
  if (skills !== undefined) data.skills = skills;
  if (tools !== undefined) data.tools = tools;
  if (discount !== undefined) data.discount = discount;
  if (benefits !== undefined) data.benefits = benefits;
  if (price !== undefined) data.price = price;
  if (Object.keys(data).length === 0) {
    throw new InvalidInputError('At least one course field must be provided');
  }
  if (price !== undefined && (!Number.isFinite(price) || price < 0)) {
    throw new InvalidInputError('Price must be a non-negative number');
  }
  if (discount !== undefined && (!Number.isFinite(discount) || discount < 0 || discount > 1)) {
    throw new InvalidInputError('Discount must be between 0 and 1');
  }
  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    throw new InvalidInputError('title must be a non-empty string');
  }
  if (course_image !== undefined && (typeof course_image !== 'string' || !course_image.trim())) {
    throw new InvalidInputError('course_image must be a non-empty string');
  }
  if (course_level !== undefined && !['beginner', 'intermediate', 'advanced'].includes(course_level)) {
    throw new InvalidInputError('course_level is invalid');
  }
  if (description !== undefined && typeof description !== 'string') {
    throw new InvalidInputError('description must be a string');
  }
  if (benefits !== undefined && typeof benefits !== 'string') {
    throw new InvalidInputError('benefits must be a string');
  }
  if (learning_outcomes !== undefined && (!Array.isArray(learning_outcomes) ||
    !learning_outcomes.every((value) => typeof value === 'string'))) {
    throw new InvalidInputError('learning_outcomes must be an array of strings');
  }
  if (skills !== undefined && (!Array.isArray(skills) || !skills.every((value) => typeof value === 'string'))) {
    throw new InvalidInputError('skills must be an array of strings');
  }
  if (tools !== undefined && (!Array.isArray(tools) || !tools.every((value) => typeof value === 'string'))) {
    throw new InvalidInputError('tools must be an array of strings');
  }

  const existing = await prisma.courses.findUnique({
    where: { course_id },
    select: { user_id: true }
  });
  if (!existing) {
    throw new NotFoundError('Course not found');
  }
  if (existing.user_id !== user_id) {
    throw new AuthorizationError('You do not own this course');
  }
  const updated_course = await prisma.courses.update({ where: { course_id }, data });
  res.status(200).json({ updated_course });
};

const deleteCourse = async (req: e.Request<{ course_id: string }, any, AuthenticatedRequestBody>, res: e.Response) => {
  const { course_id } = req.params;
  const user_id = req.body.user.user_id;
  await assertCourseOwner(course_id, user_id);
  const deleted_course = await prisma.courses.delete({ where: { course_id } });
  res.status(200).json({ deleted_course });
};

export { getAllCourses, getCourse, getCourseReviews, addCourse, updateCourse, deleteCourse, assertCourseOwner };
