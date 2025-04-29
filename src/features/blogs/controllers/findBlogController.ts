import { Request, Response } from 'express'
import { BlogViewModel } from '../../../models'
import { blogsRepository } from '../blogs.repository';
import { mapToBlogViewModel } from '../../../utils/mappers';

export const findBlogController = async (req: Request<{id: string}>, res: Response<BlogViewModel>) => {
  const entityBlog = await blogsRepository.findOne(req.params.id);
  if(!entityBlog) {
    return res.status(404);
  }
  return res.status(200).json(mapToBlogViewModel(entityBlog));
}