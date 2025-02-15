import { Request } from 'express';
import { File } from 'multer'; 

declare module 'express-serve-static-core' {
    interface Request {
        user_id?: string;
        file?: File;
    }
}
