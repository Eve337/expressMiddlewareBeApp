import {Router} from 'express'
import { updateCommentController } from './controllers/updateCommentController'
import { deleteCommentController } from './controllers/deleteCommentController'
import { findCommentByIdController } from './controllers/findCommentByIdController'
import { checkAuthHeader } from '../auth/middlewares/authMiddlewares'

export const commentsRouter = Router()

commentsRouter.put('/:commentId', checkAuthHeader, updateCommentController);
commentsRouter.delete('/:commentId', checkAuthHeader, deleteCommentController);
commentsRouter.get('/:id', checkAuthHeader, findCommentByIdController);

