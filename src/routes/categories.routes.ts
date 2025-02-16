import { Router } from 'express';
import { body } from 'express-validator';
import { CreateCategoryController } from '../controllers/category/CreateCategoryController';
import { ListCategoryController } from '../controllers/category/ListCategoryController';
import { DeleteCategoryController } from '../controllers/category/DeleteCategoryController';
import { UpdateCategoryController } from '../controllers/category/UpdateCategoryController';

const router = Router();

router.post('/', [
    body('name').isString().notEmpty().withMessage('Name is required'),
], new CreateCategoryController().handle);

router.get('/', new ListCategoryController().handle);

router.delete('/:id', new DeleteCategoryController().handle);

router.put('/:id', [
    body('name').isString().notEmpty().withMessage('Name is required'),
], new UpdateCategoryController().handle);

export default router;
