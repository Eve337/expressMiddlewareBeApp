import { Request, Response } from "express";
import { usersQueryRepository } from "../../users/repository/users.query.repository";
import { bcryptService } from "../../../utils/auth";

export const loginController = async (req: Request<any, any, { loginOrEmail: string, password: string }>, res: Response) => {
    const { loginOrEmail, password } = req.body;
    
    const currentUser = await usersQueryRepository.findByEmailOrLogin(loginOrEmail);

    if (!currentUser) return res.send().status(404);

    const comparePasswords = bcryptService.checkPassword(password, currentUser.passwordHash);

    if (!comparePasswords) return res.send().status(401);

    return res.send().status(204);
}