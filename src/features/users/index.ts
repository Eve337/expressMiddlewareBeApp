import {Router} from 'express'
import { findUserController } from './service/findUserController';
import { createUserController } from './service/createUserController';
import { deleteUserController } from './service/deleteUserController';
import { findUserValidator, userValidators } from './middlewares/users.middleware';
import { adminMiddleware } from '../../middlewares/auth.middleware';

export const usersRouter = Router()

usersRouter.get('/', findUserController);
usersRouter.post('/',userValidators, createUserController);
usersRouter.delete('/:id',findUserValidator, adminMiddleware, deleteUserController);