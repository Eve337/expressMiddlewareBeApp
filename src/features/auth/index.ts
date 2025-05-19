import {Router} from 'express'
import { loginController } from './controllers/loginController';
import { checkAuthInputModel, loginOrEmailValidator, passwordValidator } from './middlewares/authMiddlewares';

export const authRouter = Router();

authRouter.post('/login',checkAuthInputModel, loginOrEmailValidator, passwordValidator, loginController);

