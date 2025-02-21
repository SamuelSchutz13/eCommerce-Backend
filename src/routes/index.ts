import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/multer';
import rolesRoutes from './roles.routes';
import userRoutes from './user.routes';
import productsRoutes from './products.routes';
import categoriesRoutes from './categories.routes';
import discountsRoutes from './discounts.routes';
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes';
import favoritesRoutes from './favorites.routes';

const router = Router();
const upload = multer(uploadConfig.upload('./tmp'));

router.use('/users', userRoutes);
router.use('/roles', rolesRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/discounts', discountsRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/favorites', favoritesRoutes);

export { router, upload };