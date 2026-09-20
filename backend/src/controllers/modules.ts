import e from 'express'
import { InternalServerError, InvalidInputError } from '../errors/errors';
import { prisma } from '../lib/prisma';

interface ModuleBody {
  title?: string,
  description?: string,
  course_id?: string,
  module_order?: string
}
const createModule = async (req: e.Request<any, any, ModuleBody>, res: e.Response) => {
  const { title, description, course_id, module_order } = req.body;

  if (!title || !description || !course_id || !module_order) {
    throw new InvalidInputError("All necessary information must be provided");
  }
  const obj: any = { title, description, course_id, module_order };
  const new_module = await prisma.modules.create({
    data: obj
  });

  if (!new_module) {
    throw new InternalServerError("Error in creating a new module");
  }
  res.status(200).json({
    new_module
  });
}

const updateModule = async (req: e.Request<{ course_id: string, module_id: number }, any, ModuleBody>, res: e.Response) => {
  const { title, description } = req.body;
  const { module_id } = req.params;
  const obj: any = {};
  if (title) obj.title = title;
  if (description) obj.description = description;

  const updated_module = await prisma.modules.update({
    data: obj,
    where: {
      module_id: module_id
    }
  });

  if (!updateModule) {
    throw new InternalServerError("Error in updating module");
  }
  res.status(200).json({
    updated_module
  })
}

const updateModuleOrders = async (req: e.Request<{ course_id: string }, any,
  {
    new_modules_order?: { module_id?: number, module_order?: number }[]
  }
>, res: e.Response) => {
  const { new_modules_order } = req.body;
  const { course_id } = req.params;
  if (!new_modules_order) {
    throw new InvalidInputError("Invalid Body Arguments in updating module orders");
  }
  if (new_modules_order.length == 0) {
    res.status(200).json({
      message: "There are No modules order"
    });
  }
  const modules = await prisma.modules.findMany({
    where: {
      course_id: course_id,
    },
    select: {
      module_id: true
    }
  })
  if (!modules) {
    throw new InternalServerError("Error in retrieving modules from course id " + course_id)
  }

  const module_ids = modules.map((m) => m.module_id);
  for (let i = 0; i < new_modules_order.length; i++) {
    const modId = new_modules_order[i]?.module_id;
    const modOrder = new_modules_order[i]?.module_order;
    if (!Number.isInteger(modId)) {
      throw new InvalidInputError("Your Module Id is invalid");
    }
    if (!Number.isInteger(modOrder)) {
      throw new InvalidInputError("Your Module Order is invalid");
    }

    if (module_ids.includes(modId as number)) {
      await prisma.modules.update({
        where: {
          module_id: modId,
        },
        data: {
          module_order: modOrder
        }
      });
    }
  }

  res.status(200).json({
    status: "success"
  })
}

const deleteModule = async (req: e.Request<any, any, { module_id?: number }>, res: e.Response) => {
  const { module_id } = req.body;
  if (!module_id) {
    throw new InvalidInputError("Module Id is not provided");
  }
  const deletedModule = await prisma.modules.delete({
    where: {
      module_id: module_id,
    }
  });
  if (!deletedModule) {
    throw new InternalServerError("Error in deleting module");
  }
  res.status(200).json({
    deletedModule
  });
}

export { createModule, updateModule, deleteModule, updateModuleOrders }
