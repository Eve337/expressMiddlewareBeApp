import { Response, Request } from 'express'
import { commentsRepository } from '../repository/comments.repository'
import { validationResult } from 'express-validator'
import { CommentDTO } from '../types/comment.dto'
import { CommentsQueryRepository } from '../repository/commentsQuery.repository'

export const updateCommentController = async (req: Request<any, any, CommentDTO>, res: Response) => {
    if (!req.userId) return res.status(401).send();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(error => {
            const errorObj = error as any;
            return {
                message: errorObj.msg.message || errorObj.msg,
                field: errorObj.msg.field || errorObj.path
            }
        })
        return res.status(400).json({ errorsMessages: formattedErrors } )
    };
    const oldComment = await CommentsQueryRepository.find(req.params.commentId);
    if (!oldComment) return res.status(404).send();
    if (req.userId !== oldComment.commentatorInfo.userId) return res.status(403).send();

    await commentsRepository.put(req.body, req.params.commentId);
    
    return res
    .status(204)
    .send()
}