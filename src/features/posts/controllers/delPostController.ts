import {Request, Response} from 'express'
import { postsRepository } from '../posts.repository';

export const delPostController = (req: Request<{id: string}>, res: Response) => {
  postsRepository.del(req.params.id);
  res.status(204).send();
  return;
}