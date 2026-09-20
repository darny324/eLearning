import e from "express"
import { prisma } from "../lib/prisma"
import { InternalServerError, InvalidInputError } from "../errors/errors";


const createRecords = async (req: e.Request, res: e.Response) => {
  const { course_id, current_module_id, current_lesson_id, user_id } = req.body;
  if (!course_id || !current_module_id || !current_lesson_id) {
    throw new InvalidInputError("course_id must be provided");
  }
  const new_record = await prisma.records.create({
    data: {
      course_id,
      current_module_id,
      current_lesson_id,
      user_id
    }
  });
  if (!new_record) {
    throw new InternalServerError("Error in creating new records");
  }

  res.json({
    new_record
  });
}

const updateRecords = async (req: e.Request<{ record_id: number }>, res: e.Response) => {
  const { new_module_id, new_lesson_id } = req.body;
  const { record_id } = req.params;
  const obj: any = {};
  if (new_module_id) {
    obj.current_module_id = new_module_id;
  }
  if (new_lesson_id) obj.current_lesson_id = new_lesson_id;

  const updated_record = await prisma.records.update({
    where: {
      record_id
    },
    data: obj
  });
  if (!updated_record) {
    throw new InternalServerError("Error in updating records");
  }

  res.json({
    updated_record
  });
}

const deleteRecords = async (req: e.Request<{ record_id: number }>, res: e.Response) => {
  const { record_id } = req.params;
  const deleted_record = await prisma.records.delete({
    where: {
      record_id
    }
  });
  res.json({
    deleted_record
  })
}

export { createRecords, updateRecords, deleteRecords }; 
