import { Request, Response } from "express";
import { usersQueryRepository } from "../repository/users.query.repository";

export const findUserController = async (req: Request, res: Response<any>) => {
    const searchLoginTerm = req.query.searchNameTerm ? String(req.query.searchLoginTerm) : '';
    const searchEmailTerm = req.query.searchEmailTerm ? String(req.query.searchLoginTerm) : '';
    const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : 'createdAt';
    const sortDirection = req.query.sortDirection ? String(req.query.sortDirection) : 'desc';
    const entities = (await usersQueryRepository.getAll(searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection));
    if(!entities) {
        return res.status(404);
    }
    return res.status(200).json(entities);
}