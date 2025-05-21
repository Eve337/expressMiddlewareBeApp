import { ObjectId, WithId } from "mongodb";
import { CreateUserDto } from "../types/create-user.dto";
import { UserDB } from "../types/userDb.interface";
import { usersCollection } from "../../../utils/db";

export const usersRepository = {
    async create (dto: CreateUserDto): Promise<WithId<UserDB>> {
        const newUser: UserDB = {
            login: dto.login,
            email: dto.email,
            passwordHash: dto.password,
            createdAt: new Date(),
        }
        const userEntity = await usersCollection.insertOne(newUser)
    
        return { ...newUser, _id: userEntity.insertedId }
    },

    async delete (id: string) {
        return usersCollection.deleteOne({ _id: new ObjectId(id) })
    },

    async deleteAll () {
        return usersCollection.deleteMany()
    }
}