import express from 'express';
import { createRecords, deleteRecords, updateRecords } from '../controllers/records';
import { authentication_middleware } from '../middlewares/authentication';

const router = express.Router();

router.post('/', authentication_middleware, createRecords);
router.patch('/:record_id', authentication_middleware, updateRecords);
router.delete('/:record_id', authentication_middleware, deleteRecords);

export { router as RecordRouter };