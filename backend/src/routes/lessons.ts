import express from 'express';
import { createLesson, deleteLesson, getLessonsByModule, updateLesson } from '../controllers/lessons';
import { authentication_middleware } from '../middlewares/authentication';
import { instructor_middleware } from '../middlewares/authorization';

const router = express.Router();

router.get('/:module_id', authentication_middleware, instructor_middleware, getLessonsByModule);
router.post('/', authentication_middleware, instructor_middleware, createLesson);
router.patch('/:lesson_id', authentication_middleware, instructor_middleware, updateLesson);
router.delete('/:lesson_id', authentication_middleware, instructor_middleware, deleteLesson);

export { router as LessonRouter };
