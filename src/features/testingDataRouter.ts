import {Request, Response} from 'express'
import { Router } from "express"
import { postsRepository } from './posts/posts.repository'
import { blogsRepository } from './blogs/blogs.repository'
import { usersRepository } from './users/repository/users.repository'

export const testDataRouter = Router()

export const removeAllData = (req: Request, res: Response) => {
  postsRepository.deleteAll();
  blogsRepository.deleteAll();
  usersRepository.deleteAll();
  res.status(204).json();
  return;
}

testDataRouter.delete('/all-data', removeAllData)