import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(400).json({
        error: err.message
        });
    }
    
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});

app.use('/api', router);

export default app;