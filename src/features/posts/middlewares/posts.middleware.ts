import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { adminMiddleware } from "../../../middlewares/auth.middleware";
import { blogsRepository } from "../../blogs/blogs.repository";
import { postsRepository } from "../posts.repository";

export const titleValidator = body('title').isString().withMessage(() => ({ field: 'title', message: 'not string' }))
    .trim().isLength({min: 1, max: 30}).withMessage(() => ({ field: 'title', message: 'more then 30 or 0' }))
export const shortDescriptionValidator = body('shortDescription').isString().withMessage(() => ({ field: 'shortDescription', message: 'not string' }))
    .trim().isLength({min: 1, max: 100}).withMessage(() => ({ field: 'shortDescription', message: 'more then 100 or 0' }))
export const contentValidator = body('content').isString().withMessage(() => ({ field: 'content', message: 'not string' }))
    .trim().isLength({min: 1, max: 1000}).withMessage(() => ({ field: 'content', message: 'more then 500 or 0' }))
export const blogIdValidator = body('blogId').isString().withMessage(() => ({ field: 'blogId', message: 'not string' }))
    .trim().isLength({min: 1, max: 100}).withMessage(() => ({ field: 'blogId', message: 'more then 100 or 0' }))

export const findBlogIdValidator = (req: Request<any, any, { blogId: string }>, res: Response, next: NextFunction) => {
    const blogId = blogsRepository.find(req.body.blogId);
    if (!blogId) {
        res.status(404).send('Entity not found');
        return;
    }
    next();
};

export const findPostValidator = (req: Request, res: Response, next: NextFunction) => {
  const postId = postsRepository.find(req.params.id);
  if (!postId) {
      res.status(404).send('Entity not found');
      return;
  }
  next();
};

export const postValidators = [
  adminMiddleware,
  findPostValidator,
  titleValidator,
  shortDescriptionValidator,
  contentValidator,
  blogIdValidator,
];

