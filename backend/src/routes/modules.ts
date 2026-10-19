import express from 'express';
import {
  createModule,
  deleteModule,
  getModulesByCourse,
  updateModule,
  updateModuleOrders
} from '../controllers/modules';
import { authentication_middleware } from '../middlewares/authentication';
import { instructor_middleware } from '../middlewares/authorization';

const router = express.Router();

router.get('/courses/:course_id', getModulesByCourse);
router.post('/courses/:course_id', authentication_middleware, instructor_middleware, createModule);
router.patch('/courses/:course_id/order', authentication_middleware, instructor_middleware, updateModuleOrders);
router.patch('/courses/:course_id/:module_id', authentication_middleware, instructor_middleware, updateModule);
router.delete('/:module_id', authentication_middleware, instructor_middleware, deleteModule);

export { router as ModuleRouter };