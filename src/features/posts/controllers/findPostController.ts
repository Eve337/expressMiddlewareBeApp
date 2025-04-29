import {Request, Response} from 'express'
import { postsRepository } from '../posts.repository';
import { PostViewModel } from '../../../models';
import { mapToPostViewModel } from '../../../utils/mappers';

export const findPostController = async (req: Request<{id: string}>, res: Response<PostViewModel>) => {
  const entity = await postsRepository.find(req.params.id);
  if (!entity) {
    return res.status(404);
  }
  res.status(200).json(mapToPostViewModel(entity));
  return;
};