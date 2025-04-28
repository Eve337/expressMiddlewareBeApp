import {Request, Response} from 'express'
import {blogsRepository} from '../blogs.repository'
import { BlogViewModel } from '../../../models';

export const getBlogsController = async (req: Request, res: Response<BlogViewModel[]>) => {
  const entities = await blogsRepository.getAll();
  res.status(200).json(entities);
  return;
}