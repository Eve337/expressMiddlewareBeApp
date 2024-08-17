import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { adminMiddleware } from "../../../middlewares/auth.middleware";
import { blogsRepository } from "../blogs.repository";

export const nameValidator = body('name').isString().withMessage(() => ({ field: 'name', message: 'not string' }))
    .trim().isLength({min: 1, max: 15}).withMessage(() => ({ field: 'name', message: 'more then 15 or 0' }))
export const descriptionValidator = body('description').isString().withMessage(() => ({ field: 'nadescriptionme', message: 'not string' }))
    .trim().isLength({min: 1, max: 500}).withMessage(() => ({ field: 'description', message: 'more then 500 or 0' }))
export const websiteUrlValidator = body('websiteUrl').isString().withMessage(() => ({ field: 'websiteUrl', message: 'not string' }))
    .trim().isURL().withMessage(() => ({ field: 'websiteUrl', message: 'not url' }))
    .isLength({min: 1, max: 100}).withMessage(() => ({ field: 'websiteUrl', message: 'more then 100 or 0' }))

export const findBlogValidator = (req: Request, res: Response, next: NextFunction) => {
    const blogId = blogsRepository.find(req.params.id);
    if (!blogId) {
        res.status(404).send('Entity not found');
        return;
    }
    next();
};

export const blogValidators = [
  adminMiddleware,
  nameValidator,
  descriptionValidator,
  websiteUrlValidator,
];

