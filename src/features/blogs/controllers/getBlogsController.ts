import {Request, Response} from 'express'
import {blogsRepository} from '../blogs.repository'
import { BlogViewModel } from '../../../models';
import { BlogDbType } from '../../../db';
import { mapToBlogViewModel } from '../../../utils/mappers';

export const getBlogsController = async (req: Request, res: Response<BlogDbType[]>) => {
  const entities = (await blogsRepository.getAll()).map(mapToBlogViewModel);
  res.status(200).json(entities);
  return;
}