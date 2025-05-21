import { NextFunction, Request, Response } from "express";
import { AuthInputDTO } from "../types/AuthInput.dto";
import { body } from "express-validator";

export const checkAuthInputModel = async (req: Request<any, any, AuthInputDTO>, res: Response, next: NextFunction) => {

    if (!req.body.loginOrEmail || !req.body.password) {
        return res.status(400).send('inputModel has incorrect values')
    }
    next();
    return;
};

export const loginOrEmailValidator = body('loginOrEmail').isString().withMessage(() => ({ field: 'name', message: 'not string' })).bail()
    .trim().isLength({min: 1}).withMessage(() => ({ field: 'loginOrEmail', message: 'length less then 1' }))
export const passwordValidator = body('password').isString().withMessage(() => ({ field: 'name', message: 'not string' })).bail()
    .trim().isLength({min: 1}).withMessage(() => ({ field: 'password', message: 'length less then 1' }))    
