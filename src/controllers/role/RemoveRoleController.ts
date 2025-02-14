import { Request, Response } from 'express';
import { RemoveRoleService } from '../../services/role/RemoveRoleService';

class RemoveRoleController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const removeRoleService = new RemoveRoleService();
        const role = await removeRoleService.execute({ id: Number(id) });
        
        return res.json(role);
    }
}

export { RemoveRoleController };
