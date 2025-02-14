import { Router } from 'express';
import { body } from 'express-validator';
import { CreateRoleController } from '../controllers/role/CreateRoleController';
import { ListRoleController } from '../controllers/role/ListRoleController';
import { RemoveRoleController } from '../controllers/role/RemoveRoleController';
import { ensureHasRole } from '../middlewares/ensureHasRole';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();

router.post('/', isAuthenticated, ensureHasRole('administrator'), [
    body('name').isString().notEmpty().withMessage('Name is required!')
], new CreateRoleController().handle);

router.get('/', isAuthenticated, ensureHasRole('customer'), 
    new ListRoleController().handle);

router.delete('/:id', isAuthenticated, ensureHasRole('administrator'), new RemoveRoleController().handle);

export default router;
