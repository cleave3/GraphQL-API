import { NextFunction, Response } from 'express';
import { AuthenticationError } from "apollo-server-errors"
import { FAuth } from '@foodmoni.com/helper';
import { IRequest } from '../interface/IRequest';

export const checkAuth = (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const token = (req.headers['token'] || req.header('Authorization')) as string;

        if (!token) {
            req.auth = { user: null, enterprise: null }
            req.isAuth = false;
            return next();
        }
        const payload = new FAuth().decodeToken(token);
        if (!payload) {
            req.auth = { user: null, enterprise: null }
            req.isAuth = false;
            return next();
        }

        req.auth = JSON.parse(payload);
        req.isAuth = true;
        next();
    } catch (error) {
        req.auth = { user: null, enterprise: null }
        req.isAuth = false;
        return next();
    }
};