import {Request, Response} from 'express'
import { commentsRepository } from '../repository/comments.repository';

export const deleteCommentController = async (req: Request<{id: string}>, res: Response) => {
  const newBlog = await commentsRepository.delete(req.params.id);

  res.status(204).json(newBlog)
  return;
}