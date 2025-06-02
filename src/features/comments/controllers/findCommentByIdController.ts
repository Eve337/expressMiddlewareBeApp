import { Request, Response } from 'express'
import { CommentsQueryRepository } from '../repository/commentsQuery.repository';
import { CommentView } from '../types/commentsView.interface';

export const findCommentByIdController = async (req: Request<{id: string}>, res: Response<CommentView>) => {
  const comment = await CommentsQueryRepository.find(req.params.id);
  if(!comment) {
    return res.status(404);
  }
  return res.status(200).json(comment);
}