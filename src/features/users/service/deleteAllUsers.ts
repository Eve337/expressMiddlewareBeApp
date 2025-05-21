import {Request, Response} from 'express'
import { usersRepository } from '../repository/users.repository';

export const deleteAllUsersController = async (req: Request, res: Response) => {
    await usersRepository.deleteAll();

    return res.status(204).send();
};
