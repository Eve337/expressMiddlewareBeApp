import { ObjectId, SortDirection, WithId } from "mongodb"
import { commentsCollection, usersCollection } from "../../../utils/db"
import { CommentView } from "../types/commentsView.interface";
import { usersQueryRepository } from "../../users/repository/users.query.repository";
import { sortDirections } from "../../../constants";
import { CommentDB } from "../types/commentDb.interface";

export const CommentsQueryRepository ={
    async find(commentId: string): Promise<CommentView | null> {
        const currentComment = await commentsCollection.findOne({ _id: new ObjectId(commentId)});
        if (!currentComment) return null;
        const userInfo = await usersQueryRepository.findById(currentComment.commentatorId);
        if (!userInfo) return null;

        return {
            id: String(commentId),
            createdAt: currentComment.createdAt,
            content: currentComment.content,
            commentatorInfo: {
                userLogin: userInfo.login,
                userId: userInfo.id,
            }
        }
    },

    async getAllCommentsByPostId(
        postId: string,
        pageNumber = 1,
        pageSize = 10,
        sortBy = 'createdAt',
        sortDirection = 'desc'
      ) {
    
        const entities = await commentsCollection
          .find({ postId })
          .sort({ [sortBy]: sortDirections[sortDirection] as SortDirection })
          .skip((pageNumber - 1) * pageSize)
          .limit(pageSize)
          .toArray();
      
        const totalCount = await commentsCollection.countDocuments({
          postId
        });

        return {
          pagesCount: Math.ceil(totalCount / pageSize),
          page: pageNumber,
          pageSize: pageSize,
          totalCount: totalCount,
          items: await Promise.all(entities.map(this._getInView)),
        };
    },

    async _getInView({ _id, commentatorId, content, createdAt }: WithId<CommentDB>) {
        const user = await usersQueryRepository.findById(commentatorId);
        return {
            id: String(_id),
            createdAt,
            content,
            commentatorInfo: {
                userLogin: user!.login,
                userId: user!.id,
            }
        }
    }
}