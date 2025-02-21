import Router from 'express';
import { body } from 'express-validator';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { CreateCommentController } from '../controllers/comments/CreateCommentController';
import { DeleteCommentController } from '../controllers/comments/DeleteCommentController';
import { UpdateCommentController } from '../controllers/comments/UpdateCommentController';
import { ensureHasRole } from '../middlewares/ensureHasRole';

const router = Router();

router.post('/', isAuthenticated, [
    body('rating').isNumeric().notEmpty().withMessage('Rating is required'),
    body('comment').isString().notEmpty().withMessage('Comment is required'),
    body('order_id').isNumeric().notEmpty().withMessage('Product ID is required'),
    body('product_id').isNumeric().notEmpty().withMessage('Product ID is required'),
], new CreateCommentController().handle);

router.patch('/:id', isAuthenticated, [
    body('rating').isNumeric().notEmpty().withMessage('Rating is required'),
    body('comment').isString().notEmpty().withMessage('Comment is required'),
    body('order_id').isNumeric().notEmpty().withMessage('Product ID is required'),
    body('product_id').isNumeric().notEmpty().withMessage('Product ID is required'),
], new UpdateCommentController().handle);

router.delete('/:id', isAuthenticated, ensureHasRole("administrator"), new DeleteCommentController().handle);

export default router;