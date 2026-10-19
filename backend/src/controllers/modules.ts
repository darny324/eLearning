import e from 'express';
import { AuthorizationError, InvalidInputError, NotFoundError } from '../errors/errors';
import { prisma } from '../lib/prisma';
import { assertCourseOwner } from './courses';
import { AuthenticatedRequestBody } from '../types/auth';
import { isNonNegativeInteger, isPositiveInteger, isUuid } from '../lib/validation';

interface ModuleBody {
  title?: string;
  description?: string;
  module_order?: number;
}

const parseModuleId = (value: string): number => {
  const module_id = Number(value);
  if (!Number.isSafeInteger(module_id) || module_id < 1) {
    throw new InvalidInputError('Module ID must be a positive integer');
  }
  return module_id;
};

const getModulesByCourse = async (req: e.Request<{ course_id: string }>, res: e.Response) => {
  if (!isUuid(req.params.course_id)) {
    throw new InvalidInputError('course_id must be a UUID');
  }
  const modules = await prisma.modules.findMany({
    where: { course_id: req.params.course_id },
    orderBy: { module_order: 'asc' }
  });
  res.status(200).json({ modules });
};

const createModule = async (req: e.Request<{ course_id: string }, any, AuthenticatedRequestBody<ModuleBody>>, res: e.Response) => {
  const { title, description, module_order } = req.body;
  const { course_id } = req.params;
  const user_id = req.body.user.user_id;
  if (!isUuid(course_id) || typeof title !== 'string' || !title.trim() ||
    !isNonNegativeInteger(module_order) ||
    (description !== undefined && typeof description !== 'string')) {
    throw new InvalidInputError('Title and a non-negative integer module_order are required');
  }
  await assertCourseOwner(course_id, user_id);
  const new_module = await prisma.modules.create({
    data: { title, description: description ?? '', course_id, module_order }
  });
  res.status(201).json({ new_module });
};

const updateModule = async (req: e.Request<{ course_id: string; module_id: string }, any, AuthenticatedRequestBody<ModuleBody>>, res: e.Response) => {
  const module_id = parseModuleId(req.params.module_id);
  const user_id = req.body.user.user_id;
  await assertCourseOwner(req.params.course_id, user_id);
  const existing = await prisma.modules.findFirst({
    where: { module_id, course_id: req.params.course_id },
    select: { module_id: true }
  });
  if (!existing) {
    throw new NotFoundError('Module not found');
  }

  const data: { title?: string; description?: string; module_order?: number } = {};
  const { title, description, module_order } = req.body;
  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      throw new InvalidInputError('title must be a non-empty string');
    }
    data.title = title;
  }
  if (description !== undefined) {
    if (typeof description !== 'string') {
      throw new InvalidInputError('description must be a string');
    }
    data.description = description;
  }
  if (module_order !== undefined) {
    if (!isNonNegativeInteger(module_order)) {
      throw new InvalidInputError('module_order must be a non-negative integer');
    }
    data.module_order = module_order;
  }
  if (Object.keys(data).length === 0) {
    throw new InvalidInputError('At least one module field must be provided');
  }
  const updated_module = await prisma.modules.update({ where: { module_id }, data });
  res.status(200).json({ updated_module });
};

const updateModuleOrders = async (req: e.Request<{ course_id: string }, any, AuthenticatedRequestBody<{
  new_modules_order?: { module_id?: number; module_order?: number }[]
}>>, res: e.Response) => {
  const { new_modules_order } = req.body;
  const { course_id } = req.params;
  const user_id = req.body.user.user_id;
  if (!Array.isArray(new_modules_order)) {
    throw new InvalidInputError('new_modules_order must be an array');
  }
  if (new_modules_order.length === 0) {
    res.status(200).json({ status: 'success', updated: 0 });
    return;
  }
  await assertCourseOwner(course_id, user_id);

  const module_ids = new Set<number>();
  const order_updates: { module_id: number; module_order: number }[] = [];
  for (const item of new_modules_order) {
    if (!item || typeof item !== 'object') {
      throw new InvalidInputError('Each module order entry must be an object');
    }
    if (!isPositiveInteger(item.module_id) || !isNonNegativeInteger(item.module_order)) {
      throw new InvalidInputError('Each module order entry needs positive module_id and non-negative module_order');
    }
    if (module_ids.has(item.module_id)) {
      throw new InvalidInputError('A module may appear only once in new_modules_order');
    }
    module_ids.add(item.module_id);
    order_updates.push({ module_id: item.module_id, module_order: item.module_order });
  }

  const modules = await prisma.modules.findMany({
    where: { course_id, module_id: { in: [...module_ids] } },
    select: { module_id: true }
  });
  if (modules.length !== module_ids.size) {
    throw new NotFoundError('One or more modules do not belong to this course');
  }
  await prisma.$transaction(order_updates.map((item) =>
    prisma.modules.update({
      where: { module_id: item.module_id },
      data: { module_order: item.module_order }
    })
  ));
  res.status(200).json({ status: 'success', updated: new_modules_order.length });
};

const deleteModule = async (req: e.Request<{ module_id: string }, any, AuthenticatedRequestBody>, res: e.Response) => {
  const module_id = parseModuleId(req.params.module_id);
  const user_id = req.body.user.user_id;
  const module = await prisma.modules.findUnique({
    where: { module_id },
    select: { course_id: true }
  });
  if (!module?.course_id) {
    throw new NotFoundError('Module not found');
  }
  const course = await prisma.courses.findUnique({
    where: { course_id: module.course_id },
    select: { user_id: true }
  });
  if (!course) {
    throw new NotFoundError('Module not found');
  }
  if (course.user_id !== user_id) {
    throw new AuthorizationError('You do not own this module');
  }
  const deletedModule = await prisma.modules.delete({ where: { module_id } });
  res.status(200).json({ deletedModule });
};

export { getModulesByCourse, createModule, updateModule, deleteModule, updateModuleOrders };
