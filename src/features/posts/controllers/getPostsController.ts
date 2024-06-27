import {Request, Response} from 'express'
import {postsRepository} from '../posts.repository'
import { BlogViewModel } from '../../../models';

export const getPostsController = (req: Request, res: Response<BlogViewModel[]>) => {
  res.status(200).json(postsRepository.getAll());
  return;
}