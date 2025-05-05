import {Request, Response} from 'express'
import {blogsRepository} from '../blogs.repository'
import { BlogViewModel } from '../../../models';
import { BlogDbType } from '../../../db';
import { mapToBlogViewModel } from '../../../utils/mappers';

export const getBlogsController = async (req: Request, res: Response<BlogDbType[]>) => {
  const searchNameTerm = req.query.searchNameTerm ? String(req.query.searchNameTerm) : ''
  const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
  const sortBy = req.query.sortBy ? String(req.query.sortBy) : 'createdAt';
  const sortDirection = req.query.sortDirection ? String(req.query.sortDirection) : 'desc';
  const entities = (await blogsRepository.getAll(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection)).map(mapToBlogViewModel);
  if(!entities) {
    return res.status(404);
  }
  return res.status(200).json(entities);
}