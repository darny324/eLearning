import express from 'express';
import { create_user, deleteReview, enrollInCourse, getCourseByUser, getCoursesByUser, getLessonByUser, giveReview, Login } from '../controllers/users';
import { authentication_middleware } from '../middlewares/authentication';

const router = express.Router();

router.post('auth/sign-up', create_user);
router.get('auth/sign-in', Login);
router.get('courses/', authentication_middleware, getCoursesByUser);
router.get('courses/:course_id', authentication_middleware, getCourseByUser);
router.get('lessons', authentication_middleware, getLessonByUser);
router.post('reviews', authentication_middleware, giveReview);
router.post('enroll', authentication_middleware, enrollInCourse);
router.delete('reviews', authentication_middleware, deleteReview);
export { router as UserRouter };
