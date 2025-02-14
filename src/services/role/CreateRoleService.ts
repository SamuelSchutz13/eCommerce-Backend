import { prismaClient } from "../../prisma";

interface RoleRequest {
    name: string;
}

class CreateRoleService {
    async execute({ name }: RoleRequest) {

        if(!name) {
            throw new Error("Name is required!");
        }
        
        const role = await prismaClient.role.create({
            data: {
                name: name
            }
        });

        return role;
    }
}

export { CreateRoleService };

