import { Request, Response, NextFunction } from 'express';
import { INTERNAL_ERROR_MSG } from '../constants';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: INTERNAL_ERROR_MSG });
    next();
}