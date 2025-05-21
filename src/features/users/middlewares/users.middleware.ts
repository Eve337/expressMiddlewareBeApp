import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { adminMiddleware } from "../../../middlewares/auth.middleware";
import { usersQueryRepository } from "../repository/users.query.repository";

export const loginValidator = body('login').isString().withMessage(() => ({ field: 'login', message: 'not string' })).bail()
    .trim().isLength({min: 3, max: 10}).withMessage(() => ({ field: 'login', message: 'more then 15 or 0' })).bail()
    .matches(/^[a-zA-Z0-9_-]*$/, "i").withMessage(() => ({ field: 'login', message: 'not matches regex' }));
export const passwordValidator = body('password').isString().withMessage(() => ({ field: 'password', message: 'not string' })).bail()
    .trim().isLength({min: 6, max: 20}).withMessage(() => ({ field: 'password', message: 'more then 500 or 0' }));
export const emailValidator = body('email').isString().withMessage(() => ({ field: 'email', message: 'not string' })).bail()
    .trim().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "i").withMessage(() => ({ field: 'email', message: 'not matches regex' }));

export const findUserValidator = async (req: Request, res: Response, next: NextFunction) => {
    const blogId = await usersQueryRepository.findById(req.params.id);
    if (!blogId) {
        res.status(404).send('Entity not found');
        return;
    }
    next()
};

export const userValidators = [
  adminMiddleware,
  loginValidator,
  passwordValidator,
  emailValidator,
];

