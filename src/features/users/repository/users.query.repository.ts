import { ObjectId, SortDirection, WithId } from "mongodb";
import { UserDB } from "../types/userDb.interface";
import { usersCollection } from "../../../utils/db";
import { sortDirections } from "../../../constants";
import { UserView } from "../types/userView.interface";

export const usersQueryRepository = {
  async getAll(
    searchLoginTerm: string,
    searchEmailTerm: string,
    pageNumber = 1,
    pageSize = 10,
    sortBy = 'createdAt',
    sortDirection = 'desc'
  ) {
    const filter: any = {
      login: {},
      email: {},
    };
  
    if (searchLoginTerm?.trim()) {
      const safeTerm = searchLoginTerm.toLowerCase().trim();
      filter.login = { login: {$regex: new RegExp(safeTerm, 'i') }};
    }
  
    if (searchEmailTerm?.trim()) {
      const safeTerm = searchEmailTerm.toLowerCase().trim();
      filter.email = { email: { $regex: new RegExp(safeTerm, 'i') }};
    }

    const entities = await usersCollection
      .find({
        $or: [filter.login, filter.email]
    })
      .sort({ [sortBy]: sortDirections[sortDirection] as SortDirection })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();
  
    const totalCount = await usersCollection.countDocuments({
      $or: [filter.login, filter.email]
  });
  
    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize: pageSize,
      totalCount: totalCount,
      items: entities.map(this._getInView),
    };
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