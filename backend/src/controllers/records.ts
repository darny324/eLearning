import e from 'express';
import { AuthorizationError, InvalidInputError, NotFoundError } from '../errors/errors';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequestBody } from '../types/auth';
import { isPositiveInteger, isUuid } from '../lib/validation';

const parseRecordId = (value: string): bigint => {
  if (!/^\d+$/.test(value)) {
    throw new InvalidInputError('record_id must be a positive integer');
  }
  const record_id = BigInt(value);
  if (record_id < 1n) {
    throw new InvalidInputError('record_id must be a positive integer');
  }
  return record_id;
};

const createRecords = async (req: e.Request<any, any, AuthenticatedRequestBody<{
  course_id?: unknown;
  current_module_id?: unknown;
  current_lesson_id?: unknown;
}>>, res: e.Response) => {
  const { course_id, current_module_id, current_lesson_id } = req.body;
  const user_id = req.body.user.user_id;
  if (!isUuid(course_id) || !isPositiveInteger(current_module_id) ||
    !isPositiveInteger(current_lesson_id)) {
    throw new InvalidInputError('course_id, current_module_id, and current_lesson_id are required');
  }
  const enrollment = await prisma.enrollment.findFirst({ where: { course_id, user_id } });
  if (!enrollment) {
    throw new AuthorizationError('You must be enrolled to save course progress');
  }
  const lesson = await prisma.lessons.findFirst({
    where: {
      lesson_id: current_lesson_id,
      module_id: current_module_id,
      modules: { course_id }
    },
    select: { lesson_id: true }
  });
  if (!lesson) {
    throw new InvalidInputError('The selected lesson does not belong to this course and module');
  }

  const existing = await prisma.records.findFirst({ where: { course_id, user_id } });
  const record = existing
    ? await prisma.records.update({
      where: { record_id: existing.record_id },
      data: { current_module_id, current_lesson_id }
    })
    : await prisma.records.create({
      data: { course_id, user_id, current_module_id, current_lesson_id }
    });
  res.status(200).json({ record });
};

const updateRecords = async (req: e.Request<{ record_id: string }, any, AuthenticatedRequestBody<{
  new_module_id?: unknown;
  new_lesson_id?: unknown;
}>>, res: e.Response) => {
  const record_id = parseRecordId(req.params.record_id);
  const user_id = req.body.user.user_id;
  const { new_module_id, new_lesson_id } = req.body;
  const record = await prisma.records.findFirst({
    where: { record_id, user_id }
  });
  if (!record) {
    throw new NotFoundError('Progress record not found');
  }
  if (new_module_id !== undefined && !isPositiveInteger(new_module_id)) {
    throw new InvalidInputError('new_module_id must be an integer');
  }
  if (new_lesson_id !== undefined && !isPositiveInteger(new_lesson_id)) {
    throw new InvalidInputError('new_lesson_id must be an integer');
  }
  if (new_module_id === undefined && new_lesson_id === undefined) {
    throw new InvalidInputError('At least one progress field must be provided');
  }
  const module_id = new_module_id ?? record.current_module_id;
  const lesson_id = new_lesson_id ?? record.current_lesson_id;
  if (module_id !== null && module_id !== undefined) {
    const module = await prisma.modules.findFirst({
      where: { module_id, course_id: record.course_id ?? undefined },
      select: { module_id: true }
    });
    if (!module) {
      throw new InvalidInputError('The selected module does not belong to this course');
    }
  }
  if (lesson_id !== null && lesson_id !== undefined) {
    if (module_id === null || module_id === undefined) {
      throw new InvalidInputError('A module is required when saving a lesson');
    }
    const lesson = await prisma.lessons.findFirst({
      where: {
        lesson_id,
        module_id,
        modules: { course_id: record.course_id ?? undefined }
      },
      select: { lesson_id: true }
    });
    if (!lesson) {
      throw new InvalidInputError('The selected lesson does not belong to this course and module');
    }
  }
  const updated_record = await prisma.records.update({
    where: { record_id },
    data: {
      ...(new_module_id === undefined ? {} : { current_module_id: new_module_id }),
      ...(new_lesson_id === undefined ? {} : { current_lesson_id: new_lesson_id })
    }
  });
  res.status(200).json({ updated_record });
};

const deleteRecords = async (req: e.Request<{ record_id: string }, any, AuthenticatedRequestBody>, res: e.Response) => {
  const record_id = parseRecordId(req.params.record_id);
  const user_id = req.body.user.user_id;
  const record = await prisma.records.findFirst({ where: { record_id, user_id } });
  if (!record) {
    throw new NotFoundError('Progress record not found');
  }
  const deleted_record = await prisma.records.delete({ where: { record_id } });
  res.status(200).json({ deleted_record });
};

export { createRecords, updateRecords, deleteRecords };
