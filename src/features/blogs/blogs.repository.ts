import { BlogDbType, db } from "../../db"
import { BlogInputModel, BlogViewModel } from "../../models"
import { blogsCollection } from "../../utils/db"
import { ObjectId, WithId } from 'mongodb';

export const blogsRepository = {
  async create(blog: BlogInputModel): Promise<WithId<BlogViewModel>> {
    const newBlog: BlogDbType = {
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl, 
        createdAt: new Date().toISOString(),
        isMembership: true,
    }
    const blogEntity = await blogsCollection.insertOne(newBlog)

    return { ...newBlog, _id: blogEntity.insertedId }
  },
  async findOne(id: string): Promise<WithId<BlogViewModel> | null> {
    return blogsCollection.findOne({ _id: new ObjectId(id) });
  },
  async findAndMap(id: string): Promise<WithId<BlogViewModel> | null> {
    return blogsCollection.findOne({ _id: new ObjectId(id) });
  },
  async getAll() {
    return blogsCollection.find().toArray();
  },
  async del(id: string) {
    return blogsCollection.deleteOne({ _id: new ObjectId(id) });
  },
  async put(blog: BlogInputModel, id: string) {
    const entity = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: blog.name,
          description: blog.description,
          websiteUrl: blog.websiteUrl,
        }
      }
    );
    if (entity.matchedCount < 1) {
      throw new Error('Driver not exist');
    }
    return;
  },

  async deleteAll(){
    return blogsCollection.deleteMany();
  }
}