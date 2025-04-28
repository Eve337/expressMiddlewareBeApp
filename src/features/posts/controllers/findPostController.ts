import {Request, Response} from 'express'
import { postsRepository } from '../posts.repository';
import { PostViewModel } from '../../../models';

export const findPostController = async (req: Request<{id: string}>, res: Response<PostViewModel>) => {
  const entity = await postsRepository.find(req.params.id);
  if (!entity) {
    res.status(404)
    return;
  }
  res.status(200).json(entity);
  return;
}