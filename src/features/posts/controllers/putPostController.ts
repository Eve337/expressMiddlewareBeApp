import { Request, Response } from 'express'
import { postsRepository } from '../posts.repository'
import { BasicErrorResponse, BlogInputModel, PostInputModel } from '../../../models'
import { blogsRepository } from '../../blogs/blogs.repository';
import { validationResult } from 'express-validator';

export const putPostController = (req: Request<{id: string}, any, PostInputModel>, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // in case request params meet the validation criteria
    return res.status(400).json({ errors: errors.array() } as BasicErrorResponse)
  };

  const updatedEntity = postsRepository.put(req.body, req.params.id);
  res.status(204).json(updatedEntity);
  return
}