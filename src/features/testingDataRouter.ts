import {Request, Response} from 'express'
import { Router } from "express"
import { postsRepository } from './posts/posts.repository'
import { blogsRepository } from './blogs/blogs.repository'

export const testDataRouter = Router()

export const removeAllData = (req: Request, res: Response) => {
  postsRepository.deleteAll();
  blogsRepository.deleteAll();
  
  res.status(204).json();
  return;
}

testDataRouter.delete('/all-data', removeAllData)