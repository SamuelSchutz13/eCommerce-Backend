import { Router } from 'express';
import { body } from 'express-validator';
import { CreateProductController } from '../controllers/product/CreateProductController';
import { ListAllProductController } from '../controllers/product/ListAllProductController';
import { ListProductController } from '../controllers/product/ListProductController';
import { DeleteProductController } from '../controllers/product/DeleteProductController';
import { UpdateProductController } from '../controllers/product/UpdateProductController';
import multer from 'multer';
import uploadConfig from '../config/multer';

const upload = multer(uploadConfig.upload('./tmp'));
const router = Router();

router.post('/', [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('price').isNumeric().notEmpty().withMessage('Price is required'),
    body('stock_quantity').isNumeric().notEmpty().withMessage('Stock quantity is required'),
    body('categories').isString().notEmpty().withMessage('Categories is required'), 
], upload.single('file'), new CreateProductController().handle);

router.get('/', new ListAllProductController().handle);
router.get('/:id', new ListProductController().handle);

router.delete('/:id', new DeleteProductController().handle);

router.patch('/:id', [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('price').isNumeric().notEmpty().withMessage('Price is required'),
    body('stock_quantity').isNumeric().notEmpty().withMessage('Stock quantity is required'),
], upload.single('file'), new UpdateProductController().handle);

export default router;
