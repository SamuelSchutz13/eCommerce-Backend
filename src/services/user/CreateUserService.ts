import { hash } from "bcryptjs";
import { prismaClient } from "../../prisma";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}: UserRequest) {
        if (!email) {
            throw new Error('Email incorrect');
        }

        if(!name) {
            throw new Error('Name is required');
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(userAlreadyExists) {
            throw new Error('User already exists');
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                roles: {
                    create: {
                        role: {
                            connect: {
                                name: 'customer'
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return user;
    }
}

export { CreateUserService };
