import { sortDirections } from "../../constants";
import { BlogDbType, PostDbType } from "../../db"
import { BlogInputModel } from "../../models"
import { blogsCollection, postsCollection } from "../../utils/db"
import { ObjectId, SortDirection, WithId } from 'mongodb';

export const blogsRepository = {
  async create(blog: BlogInputModel): Promise<WithId<BlogDbType>> {
    const newBlog: BlogDbType = {
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl, 
        createdAt: new Date().toISOString(),
        isMembership: false,
    }
    const blogEntity = await blogsCollection.insertOne(newBlog)

    return { ...newBlog, _id: blogEntity.insertedId }
  },
  async findOne(id: string): Promise<WithId<BlogDbType> | null> {
    return blogsCollection.findOne({ _id: new ObjectId(id) });
  },
  async findAllPosts(id: string): Promise<Array<WithId<PostDbType>>> {
    return postsCollection.find({ blogId: id }).toArray();
  },
  async findAndMap(id: string): Promise<WithId<BlogDbType> | null> {
    return blogsCollection.findOne({ _id: new ObjectId(id) });
  },
  async getAll(searchNameTerm: string, pageNumber = 1, pageSize = 10, sortBy = 'createdAt', sortDirection = 'desc') {
    const entities = await blogsCollection.find({ name: { $regex: searchNameTerm, $options: 'i' }})
    .sort({ [sortBy]: sortDirections[sortDirection] as SortDirection })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize).toArray();
    const totalCount = await blogsCollection.countDocuments({ name: { $regex: searchNameTerm, $options: 'i' }});
    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize: pageSize,
      totalCount: totalCount,
      items: entities,
    }
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