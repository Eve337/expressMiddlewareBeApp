import { ObjectId, SortDirection, WithId } from "mongodb";
import { CreateUserDto } from "../types/create-user.dto";
import { UserDB } from "../types/userDb.interface";
import { usersCollection } from "../../../utils/db";
import { sortDirections } from "../../../constants";
import { UserView } from "../types/userView.interface";

export const usersQueryRepository = {
    async getAll(searchLoginTerm: string, searchEmailTerm: string, pageNumber = 1, pageSize = 10, sortBy = 'createdAt', sortDirection = 'desc') {
        const filter: { login?: { $regex: RegExp; }, email?: { $regex: RegExp; } } = {};

        if (searchLoginTerm?.trim()) {
          filter.login = { $regex: new RegExp(searchLoginTerm.trim(), 'i') };
        }

        if (searchEmailTerm?.trim()) {
          filter.email = { $regex: new RegExp(searchEmailTerm.trim(), 'i') };
        }

        const entities = await usersCollection.find({
          $and: [
            { login: filter.login },
            { email: filter.email, }
          ]
      })
        .sort({ [sortBy]: sortDirections[sortDirection] as SortDirection })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize).toArray();
        const totalCount = await usersCollection.countDocuments({
          $and: [
            { login: filter.login },
            { email: filter.email, }
          ]
      });
        return {
          pagesCount: Math.ceil(totalCount / pageSize),
          page: pageNumber,
          pageSize: pageSize,
          totalCount: totalCount,
          items: entities.map(this._getInView),
        }
    },

    async findById(id: string) {
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });
        return user ? this._getInView(user) : null;
    },
    _getInView(user: WithId<UserDB>): UserView {
        return {
          id: user._id.toString(),
          login: user.login,
          email: user.email,
          createdAt: user.createdAt.toISOString(),
        };
      },
    async findByEmailOrLogin(emailAndLogin: string, login?: string ) {
      return usersCollection.findOne( { $or: [{ email: emailAndLogin }, { login: login || emailAndLogin }]});
    }
}