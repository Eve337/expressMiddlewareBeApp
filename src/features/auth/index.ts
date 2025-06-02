import {Router} from 'express'
import { loginController } from './controllers/loginController';
import { checkAuthHeader, checkAuthInputModel, loginOrEmailValidator, passwordValidator } from './middlewares/authMiddlewares';
import { getInfoAboutCurrentUser } from './controllers/getInfoAboutCurrentUser';

export const authRouter = Router();

authRouter.post('/login',checkAuthInputModel, loginOrEmailValidator, passwordValidator, loginController);
authRouter.get('/me',checkAuthHeader, getInfoAboutCurrentUser);

