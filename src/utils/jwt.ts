import jwt from 'jsonwebtoken';
import {config} from 'dotenv'
import { appConfig } from '../settings/config';

config()

export const jwtService = {
    createAccessToken (userId: string) {
        return jwt.sign({
            userId
          }, appConfig.AC_SECRET, { expiresIn: '86400' });
    },
    verifyToken (token: string) {
        try {
            console.log(token, 3)
            return jwt.verify(token, appConfig.AC_SECRET) as { userId: string };
        } catch {
            console.log('cant verify token')
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