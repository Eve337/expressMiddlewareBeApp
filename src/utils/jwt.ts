import jwt from 'jsonwebtoken';
import {config} from 'dotenv'
import { appConfig } from '../settings/config';

config()

export const jwtService = {
    createAccessToken (userId: string) {
        return jwt.sign({
            userId
          }, appConfig.AC_SECRET, { expiresIn: '1d' });
    },
    verifyToken (token: string) {
        try {
            return jwt.verify(token, appConfig.AC_SECRET) as { userId: string };
        } catch (e) {
            console.log('cant verify token', e)
            return null;
        }
        
    },
    decodeToken (token: string) {
        try {
            return jwt.decode(token);
        } catch {
            console.log('cant decode token')
            return null;
        }
        
    }
}

export const getTokenFromHeader = (authHeader: string) => authHeader.split(' ').at(-1) || '';