import {Request, Response} from 'express'
import {blogsRepository} from '../blogs.repository'
import { BasicErrorResponse, BlogInputModel } from '../../../models'
import { validationResult } from 'express-validator';

export const putBlogController = (req: Request<{id: string}, any, BlogInputModel>, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(error => {
            const errorObj = error as any;
            return {
                message: errorObj.msg.message || errorObj.msg,
                field: errorObj.msg.field || errorObj.path
            }
        })
        return res.status(400).json({ errorsMessages: formattedErrors } )
    };
  const entityToUpdate = blogsRepository.put(req.body, req.params.id);
  return res.status(204).json(entityToUpdate);
}