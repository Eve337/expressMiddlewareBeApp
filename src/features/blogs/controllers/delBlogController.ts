import {Request, Response} from 'express'
import {blogsRepository} from '../blogs.repository'

export const delBlogController = (req: Request<{id: string}>, res: Response) => {
  const newBlog = blogsRepository.del(req.params.id);

  res.status(204).json(newBlog)
  return;
}