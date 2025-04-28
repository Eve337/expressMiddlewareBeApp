import {Request, Response} from 'express'
import {postsRepository} from '../posts.repository'
import { PostViewModel } from '../../../models';

export const getPostsController = async (req: Request, res: Response<PostViewModel[]>) => {
  const posts = await postsRepository.getAll()
  res.status(200).json(posts);
  return;
}