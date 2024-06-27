import {Request, Response} from 'express'
import { postsRepository } from '../posts.repository';
import { PostViewModel } from '../../../models';

export const findPostController = (req: Request<{id: string}>, res: Response<PostViewModel | {}>) => {
  const entity = postsRepository.find(req.params.id);
  res.status(200).json(entity);
  return;
}