import {Request, Response} from 'express'
import {blogsRepository} from '../blogs.repository'
import { BlogViewModel } from '../../../models';

export const getBlogsController = (req: Request, res: Response<BlogViewModel[]>) => {
  res.status(200).json(blogsRepository.getAll());
  return;
}