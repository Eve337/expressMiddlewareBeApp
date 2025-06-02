import { Request, Response } from "express";
import { usersQueryRepository } from "../../users/repository/users.query.repository";
import { getTokenFromHeader, jwtService } from "../../../utils/jwt";

export const getInfoAboutCurrentUser = async (req: Request, res: Response) => {
    if (!req.headers.authorization) return res.status(401).send();
    const authHeader = getTokenFromHeader(req.headers.authorization);
    const verifiedToken = jwtService.verifyToken(authHeader);
    
    if (!verifiedToken) return res.status(401).send();
    
    const currentUser = await usersQueryRepository.findByEmailOrLogin(verifiedToken.userId);
    if (!currentUser) return res.status(404).send();
    const response = {
        email: currentUser.email,
        login: currentUser.login,
        id: String(currentUser._id),
    }
 
    return res.status(200).json(response);
}