import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/multer';
import rolesRoutes from './roles.routes';
import userRoutes from './user.routes';
import productsRoutes from './products.routes';
import categoriesRoutes from './categories.routes';

const router = Router();
const upload = multer(uploadConfig.upload('./tmp'));

router.use('/users', userRoutes);
router.use('/roles', rolesRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes)

export { router, upload };