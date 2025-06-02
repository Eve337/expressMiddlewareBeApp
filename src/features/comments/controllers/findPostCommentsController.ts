import { Request, Response } from "express";
import { CommentsQueryRepository } from "../repository/commentsQuery.repository";

export const findPostCommentsController = async (req: Request, res: Response<any>) => {
    const postId = req.params.postId || '';
    const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : 'createdAt';
    const sortDirection = req.query.sortDirection ? String(req.query.sortDirection) : 'desc';
    const entities = (await CommentsQueryRepository.getAllCommentsByPostId(postId, pageNumber, pageSize, sortBy, sortDirection));
    if(!entities) {
        return res.status(404);
    }
    return res.status(200).json(entities);
}