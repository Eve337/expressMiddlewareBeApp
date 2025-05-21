import { validationResult } from "express-validator";
import { CreateUserDto } from "../types/create-user.dto";
import { Request, Response } from "express";
import { bcryptService } from "../../../utils/auth";
import { usersRepository } from "../repository/users.repository";
import { usersQueryRepository } from "../repository/users.query.repository";

export const createUserController =  async (req: Request<any, any, CreateUserDto>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(error => {
            const errorObj = error as any;
            return {
                message: errorObj.msg.message || errorObj.msg,
                field: errorObj.msg.field || errorObj.path
            }
        })
        return res.status(400).json({ errorsMessages: formattedErrors } )
    };

    const { login, email, password } = req.body;

    const isUserAlreadyExist = await usersQueryRepository.findByEmailOrLogin(email, login);
    if (isUserAlreadyExist) {
        return res.status(401).json({
            errorsMessages: [{field: 'email', message: 'email and login should be unique'}]
        })
    }
    

    const hash = await bcryptService.generateHash(password);
    const entity: CreateUserDto = {
        login,
        email,
        password: hash,
    }

    const savedEntity = await usersRepository.create(entity);
    const newUser = await usersQueryRepository.findById(String(savedEntity._id));

    if (!newUser) {
        return res.status(404).json({ errorsMessages: [{ message: 'User not found', field: 'userId' }] })
    }

    return res
    .status(201)
    .json(newUser)
};