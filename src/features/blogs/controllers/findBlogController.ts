import {Request, Response} from 'express'
import { BlogViewModel } from '../../../models'
import { blogsRepository } from '../blogs.repository';

export const findBlogController = (req: Request<{id: string}>, res: Response<BlogViewModel | {}>) => {
  const entityBlog = blogsRepository.find(req.params.id);
  return res.status(200).json(entityBlog);
}