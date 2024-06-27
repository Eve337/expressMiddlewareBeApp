import {Request, Response} from 'express'
import {blogsRepository} from '../blogs.repository'
import { BasicErrorResponse, BlogInputModel } from '../../../models'
import { validationResult } from 'express-validator';

export const putBlogController = (req: Request<{id: string}, any, BlogInputModel>, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      // in case request params meet the validation criteria
      return res.status(400).json({ errors: errors.array() } as BasicErrorResponse)
  };
  const entityToUpdate = blogsRepository.put(req.body, req.params.id);
  return res.status(204).json(entityToUpdate);
}