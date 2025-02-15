import { Router } from 'express';
import { body } from 'express-validator';
import { CreateProductController } from '../controllers/product/CreateProductController';
import { ListProductController } from '../controllers/product/ListProductController';
import multer from 'multer';
import uploadConfig from '../config/multer';
import { isModuleNamespaceObject } from 'util/types';

const upload = multer(uploadConfig.upload('./tmp'));
const router = Router();

router.post('/', [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('price').isNumeric().notEmpty().withMessage('Price is required'),
    body('stock_quantity').isNumeric().notEmpty().withMessage('Stock quantity is required'),
], upload.single('file'), new CreateProductController().handle);

router.get('/', new ListProductController().handle);

export default router;
