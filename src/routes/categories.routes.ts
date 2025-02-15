import { Router } from 'express';
import { CreateCategoryController } from '../controllers/category/CreateCategoryController';

const router = Router();

router.post('/', new CreateCategoryController().handle);

export default router;
