import {Request, Response} from 'express'
import { usersRepository } from '../repository/users.repository';

export const deleteUserController = async (req: Request<{id: string}>, res: Response) => {
    const deletedEntity = await usersRepository.delete(req.body.id);

    return res.status(204).json(deletedEntity);
};
