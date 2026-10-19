import e from 'express';
import { Prisma } from '../generated/prisma/client';
import { InvalidInputError, NotFoundError } from '../errors/errors';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequestBody } from '../types/auth';
import { isNonNegativeInteger, isPositiveInteger } from '../lib/validation';

interface LessonBody {
  module_id?: number;
  title?: string;
  lesson_link?: string;
  type?: 'text' | 'image' | 'video';
  lesson_order?: number;
}

const findOwnedLesson = async (lesson_id: number, user_id: string) => {
  const lesson = await prisma.lessons.findUnique({
    where: { lesson_id },
    select: {
      lesson_id: true,
      modules: {
        select: {
          course_id: true,
          courses: { select: { user_id: true } }
        }
      }
    }
  });
  if (!lesson?.modules?.course_id) {
    throw new NotFoundError('Lesson not found');
  }
  if (lesson.modules.courses?.user_id !== user_id) {
    throw new NotFoundError('Lesson not found');
  }
  return lesson;
};

const parseLessonId = (value: string): number => {
  const lesson_id = Number(value);
  if (!Number.isSafeInteger(lesson_id) || lesson_id < 1) {
    throw new InvalidInputError('lesson_id must be a positive integer');
  }
  return lesson_id;
};

const getLessonsByModule = async (
  req: e.Request<{ module_id: string }, any, AuthenticatedRequestBody>,
  res: e.Response
) => {
  const module_id = Number(req.params.module_id);
  if (!Number.isSafeInteger(module_id) || module_id < 1) {
    throw new InvalidInputError('module_id must be a positive integer');
  }
  const user_id = req.body.user.user_id;
  const module = await prisma.modules.findUnique({
    where: { module_id },
    select: {
      module_id: true,
      course_id: true,
      courses: { select: { user_id: true } }
    }
  });
  if (!module?.course_id) {
    throw new NotFoundError('Module not found');
  }
  if (module.courses?.user_id !== user_id) {
    throw new NotFoundError('Module not found');
  }
  const lessons = await prisma.lessons.findMany({
    where: { module_id },
    orderBy: { lesson_order: 'asc' }
  });
  res.status(200).json({ lessons });
};

const createLesson = async (
  req: e.Request<any, any, AuthenticatedRequestBody<LessonBody>>,
  res: e.Response
) => {
  const { module_id, title, lesson_link, type, lesson_order } = req.body;
  if (!isPositiveInteger(module_id) ||
    typeof lesson_link !== 'string' || !lesson_link.trim() ||
    !isNonNegativeInteger(lesson_order) ||
    (title !== undefined && typeof title !== 'string') ||
    (type !== undefined && !['text', 'image', 'video'].includes(type))) {
    throw new InvalidInputError('module_id, lesson_link, and non-negative lesson_order are required');
  }
  const module = await prisma.modules.findUnique({
    where: { module_id },
    select: {
      module_id: true,
      courses: { select: { user_id: true } }
    }
  });
  if (!module) {
    throw new NotFoundError('Module not found');
  }
  if (module.courses?.user_id !== req.body.user.user_id) {
    throw new NotFoundError('Module not found');
  }
  const data: Prisma.lessonsUncheckedCreateInput = {
    module_id: module.module_id,
    title: title ?? '',
    lesson_link: lesson_link.trim(),
    type: type ?? 'text',
    lesson_order
  };
  const lesson = await prisma.lessons.create({ data });
  res.status(201).json({ lesson });
};

const updateLesson = async (
  req: e.Request<{ lesson_id: string }, any, AuthenticatedRequestBody<LessonBody>>,
  res: e.Response
) => {
  const lesson_id = parseLessonId(req.params.lesson_id);
  await findOwnedLesson(lesson_id, req.body.user.user_id);
  const { title, lesson_link, type, lesson_order } = req.body;
  const data: Prisma.lessonsUncheckedUpdateInput = {};
  if (title !== undefined) {
    if (typeof title !== 'string') {
      throw new InvalidInputError('title must be a string');
    }
    data.title = title;
  }
  if (lesson_link !== undefined) {
    if (typeof lesson_link !== 'string' || !lesson_link.trim()) {
      throw new InvalidInputError('lesson_link must be a non-empty string');
    }
    data.lesson_link = lesson_link.trim();
  }
  if (type !== undefined) {
    if (!['text', 'image', 'video'].includes(type)) {
      throw new InvalidInputError('type must be text, image, or video');
    }
    data.type = type;
  }
  if (lesson_order !== undefined) {
    if (!isNonNegativeInteger(lesson_order)) {
      throw new InvalidInputError('lesson_order must be a non-negative integer');
    }
    data.lesson_order = lesson_order;
  }
  if (Object.keys(data).length === 0) {
    throw new InvalidInputError('At least one lesson field must be provided');
  }
  const lesson = await prisma.lessons.update({ where: { lesson_id }, data });
  res.status(200).json({ lesson });
};

const deleteLesson = async (
  req: e.Request<{ lesson_id: string }, any, AuthenticatedRequestBody>,
  res: e.Response
) => {
  const lesson_id = parseLessonId(req.params.lesson_id);
  await findOwnedLesson(lesson_id, req.body.user.user_id);
  const lesson = await prisma.lessons.delete({ where: { lesson_id } });
  res.status(200).json({ lesson });
};

export { getLessonsByModule, createLesson, updateLesson, deleteLesson };
