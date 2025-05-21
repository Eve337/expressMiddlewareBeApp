import { Request, Response } from "express";
import { usersQueryRepository } from "../../users/repository/users.query.repository";
import { bcryptService } from "../../../utils/auth";

export const loginController = async (req: Request<any, any, { loginOrEmail: string, password: string }>, res: Response) => {
    const { loginOrEmail, password } = req.body;
    const currentUser = await usersQueryRepository.findByEmailOrLogin(loginOrEmail);
    if (!currentUser) return res.status(401).send();
    const comparePasswords = await bcryptService.checkPassword(password, currentUser.passwordHash);
    if (!comparePasswords) return res.status(401).send();
    return res.status(204).send();
}