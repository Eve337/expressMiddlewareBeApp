import { NextFunction, Request, Response } from "express";
import { AuthInputDTO } from "../types/AuthInput.dto";
import { body } from "express-validator";
import { jwtService } from "../../../utils/jwt";

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

export const checkAuthHeader = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).send();
    }
    console.log(1)
    const [typeAuth, token] = req.headers.authorization.split(" ")[0];
    console.log(req.headers.authorization);
    if (!typeAuth || !token) {
        return res.status(401).send();
        
    }
    console.log(2)

    const verifiedToken = jwtService.verifyToken(token);
    if (verifiedToken) {
        const { userId } = verifiedToken;
        req.userId = userId;
        next();
        return;
    }


    res.status(401).send();
    return;
};
    