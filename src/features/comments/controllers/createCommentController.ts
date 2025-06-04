import { Request, Response } from "express";
import { commentsRepository } from "../repository/comments.repository";
import { CommentDTO } from "../types/comment.dto";

export const createCommentController = async (req: Request<any, any, CommentDTO>, res: Response) => {
    console.log(req.userId)
    if (!req.userId) return res.status(401).send();
    const comment = await commentsRepository.create(req.body, req.userId, req.params.postId);

    return res.status(201).json(comment);
};