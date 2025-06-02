import { commentsCollection } from "../../../utils/db"
import { ObjectId } from 'mongodb';
import { CommentDTO } from "../types/comment.dto";
import { CommentView } from "../types/commentsView.interface";
import { usersQueryRepository } from "../../users/repository/users.query.repository";
import { CommentDB } from "../types/commentDb.interface";

export const commentsRepository = {
  async create(comment: CommentDTO, userId: string, postId: string): Promise<CommentView> {
    const userInfo = await usersQueryRepository.findById(userId); 
    const createdAt = new Date().toISOString();

    const newCommentEntityToSave: CommentDB = {
      commentatorId: userInfo!.id,
      content: comment.content,
      createdAt,
      postId,
    }

    const commentEntity = await commentsCollection.insertOne(newCommentEntityToSave)

    const newCommentView: CommentView = {
        id: String(commentEntity.insertedId),
        createdAt,
        content: comment.content,
        commentatorInfo: {
          userLogin: userInfo!.login,
          userId: userInfo!.id,
        }
    }

    return newCommentView;
  },

  async put(comment: CommentDTO, commentId: string) {
    const entity = await commentsCollection.updateOne(
      { _id: new ObjectId(commentId) },
      {
        $set: {
          content: comment.content,
        }
      }
    );
    if (entity.matchedCount < 1) {
      throw new Error('Comment didnt exist');
    }
    return;
  },

  async delete (id: string) {
    return commentsCollection.deleteOne({ _id: new ObjectId(id) })
},
}