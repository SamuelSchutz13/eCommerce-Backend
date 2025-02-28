import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CreateRoleService } from "../../services/role/CreateRoleService";

class CreateRoleController {
    async handle(req: Request, res: Response) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        const { name } = req.body;
        const createRoleService = new CreateRoleService();
        const role = await createRoleService.execute({name});

        return res.json(role);
    }
}

export { CreateRoleController };
