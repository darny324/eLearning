import express from 'express';
import { addCourse, deleteCourse, getAllCourses, getCourse, getCourseReviews, updateCourse } from '../controllers/courses';
import { authentication_middleware } from '../middlewares/authentication';
import { instructor_middleware } from '../middlewares/authorization';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:course_id/reviews', getCourseReviews);
router.get('/:course_id', getCourse);
router.post('/', authentication_middleware, instructor_middleware, addCourse);
router.patch('/:course_id', authentication_middleware, instructor_middleware, updateCourse);
router.delete('/:course_id', authentication_middleware, instructor_middleware, deleteCourse);

export { router as CourseRouter };