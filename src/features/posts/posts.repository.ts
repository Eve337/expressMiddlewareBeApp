import { ObjectId } from "mongodb";
import { PostDbType, db } from "../../db"
import { PostInputModel, PostViewModel } from "../../models"
import { blogsCollection, postsCollection } from "../../utils/db";

export const postsRepository = {
  async create(post: PostInputModel) {
    const blog = await blogsCollection.findOne({ _id: new ObjectId(post.blogId)});
    if(!blog) return null;
    const newPost: PostDbType = {
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: String(blog._id),
        blogName: blog?.name,
    }
    const postDbEntity = await postsCollection.insertOne(newPost);
    return { ...newPost, _id: postDbEntity.insertedId };
  },
  async find(id: string) {
      return postsCollection.findOne({ _id: new ObjectId(id)});
  },
  async getAll() {
    return postsCollection.find().toArray();
  },
  async del(id: string) {
    return postsCollection.deleteOne({ _id: new ObjectId(id)});
  },
  async put(post: PostInputModel, id: string) {
    const blog = await blogsCollection.findOne({ _id: new ObjectId(post.blogId)})!;

    const newEntity = await postsCollection.updateOne({_id: new ObjectId(id)}, {
      $set: {
        blogId: String(blog?._id) || '',
        content: post.content,
        shortDescription: post.shortDescription,
        blogName: blog?.name || '',
      }
    })

    if (newEntity.modifiedCount < 1) {
      throw new Error();
    }
    return;
  },
  deleteAll() {
    postsCollection.deleteMany();
  }
}