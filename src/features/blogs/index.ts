import {Router} from 'express'
import { createBlogController } from './controllers/createBlogController'
import { getBlogsController } from './controllers/getBlogsController'
import { findBlogController } from './controllers/findBlogController'
import { delBlogController } from './controllers/delBlogController'
import { putBlogController } from './controllers/putBlogController'
import { blogValidators, findBlogValidator } from './middlewares/blogs.middleware'
import { adminMiddleware } from '../../middlewares/auth.middleware'
import { findPostFromBlogController } from './controllers/findPostFromBlogController'
import { createPostForBlogController } from './controllers/createPostForBlogController'
import { postValidators } from '../posts/middlewares/posts.middleware'

export const blogsRouter = Router()

blogsRouter.post('/', ...blogValidators, createBlogController)
blogsRouter.get('/', getBlogsController)
blogsRouter.get('/:id', findBlogValidator, findBlogController)
blogsRouter.delete('/:id', adminMiddleware, findBlogValidator, delBlogController)
blogsRouter.put('/:id', findBlogValidator, ...blogValidators, putBlogController)
blogsRouter.get('/:id/posts', findBlogValidator, findPostFromBlogController)
blogsRouter.post('/:id/posts', findBlogValidator, ...postValidators, createPostForBlogController)
