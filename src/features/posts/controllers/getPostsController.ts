import {Request, Response} from 'express'
import {postsRepository} from '../posts.repository'
import { PostViewModel } from '../../../models';
import { mapToPostViewModel } from '../../../utils/mappers';

export const getPostsController = async (req: Request, res: Response<PostViewModel[]>) => {
  const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
  const sortBy = req.query.sortBy ? String(req.query.sortBy) : 'createdAt';
  const sortDirection = req.query.sortDirection ? String(req.query.sortDirection) : 'desc';
  const entities = (await postsRepository.getAll(pageNumber, pageSize, sortBy, sortDirection)).map(mapToPostViewModel);
  if(!entities) {
    return res.status(404);
  }
  return res.status(200).json(entities);
}