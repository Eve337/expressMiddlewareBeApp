import { ObjectId, SortDirection, WithId } from "mongodb";
import { PostDbType, db } from "../../db"
import { PostInputModel } from "../../models"
import { blogsCollection, postsCollection } from "../../utils/db";
import { sortDirections } from "../../constants";

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
        createdAt: new Date().toISOString(),
    }
    const postDbEntity = await postsCollection.insertOne(newPost);
    console.log(postDbEntity.insertedId);
    return { ...newPost, _id: postDbEntity.insertedId };
  },
  async find(id: string) {
      return postsCollection.findOne({ _id: new ObjectId(id)});
  },
  async findByParamsFromBlog(id: string, pageNumber = 1, pageSize = 10, sortBy = 'createdAt', sortDirection = 'desc') {
    const posts = await postsCollection.find({ blogId: id })
    .sort({ [sortBy]: sortDirections[sortDirection] as SortDirection })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize).toArray();
    const totalCount = await postsCollection.countDocuments({ blogId: id });
    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize: pageSize,
      totalCount: totalCount,
      items: posts
    };
  },
  async getAll(pageNumber = 1, pageSize = 10, sortBy = 'createdAt', sortDirection = 'desc') {
    const entities = await postsCollection.find()
    .sort({ [sortBy]: sortDirections[sortDirection] as SortDirection })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize).toArray();
    const totalCount = await postsCollection.countDocuments();
    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize: pageSize,
      totalCount: totalCount,
      items: entities
    }
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
        title: post.title,
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