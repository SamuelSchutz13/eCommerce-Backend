import { NextFunction, Request, Response } from 'express';
import { prismaClient } from '../prisma';

function ensureHasRole(roleName: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user_id  = req.user_id;

        const userWithRole = await prismaClient.userRole.findFirst({
            where: {
                userId: user_id,
            }, select: {
                role: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        if(userWithRole?.role.name !== roleName) {
            return res.status(401).json({ error: 'Access denied' });
        }

        if(!userWithRole) {
            return res.status(401).json({ error: 'Access denied' });
        }

        return next();
    }
}

export { ensureHasRole };
