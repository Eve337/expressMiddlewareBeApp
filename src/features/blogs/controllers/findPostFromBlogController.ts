import { Request, Response } from 'express'
import { postsRepository } from '../../posts/posts.repository';
import { PostDbType, PostsWithPagination } from '../../../db';
import { mapToPostViewModel } from '../../../utils/mappers';

export const findPostFromBlogController = async (req: Request<{id: string}>, res: Response<PostsWithPagination>) => {
  const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
  const sortBy = req.query.sortBy ? String(req.query.sortBy) : 'createdAt';
  const sortDirection = req.query.sortDirection ? String(req.query.sortDirection) : 'desc';
  const posts = await postsRepository.findByParamsFromBlog(req.params.id, pageNumber, pageSize, sortBy, sortDirection);
  const result = { ...posts, items: posts.items.map(mapToPostViewModel) };
  if(!posts) {
    return res.status(404);
  }
  return res.status(200).json(result);
}