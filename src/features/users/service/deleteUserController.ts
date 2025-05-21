import {Request, Response} from 'express'
import { usersRepository } from '../repository/users.repository';

export const deleteUserController = async (req: Request, res: Response) => {
    const deletedEntity = await usersRepository.delete(req.params.id);
    return res.status(204).json(deletedEntity);
};
