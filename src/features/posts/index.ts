import {Router} from 'express'
import { findPostValidator, postValidators } from './middlewares/posts.middleware'
import { createPostController } from './controllers/createPostController'
import { getPostsController } from './controllers/getPostsController'
import { findPostController } from './controllers/findPostController'
import { adminMiddleware } from '../../middlewares/auth.middleware'
import { delPostController } from './controllers/delPostController'
import { putPostController } from './controllers/putPostController'
export const postsRouter = Router()

postsRouter.post('/', ...postValidators, createPostController);
postsRouter.get('/', getPostsController);
postsRouter.get('/:id', findPostValidator, findPostController);
postsRouter.delete('/:id', adminMiddleware, findPostValidator, delPostController);
postsRouter.put('/:id', findPostValidator, ...postValidators, putPostController);
