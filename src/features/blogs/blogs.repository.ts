import { BlogDbType, db } from "../../db"
import { BlogInputModel, BlogViewModel } from "../../models"

export const blogsRepository = {
  create(blog: BlogInputModel) {
    const newBlog: BlogDbType = {
        id: new Date().toISOString() + Math.random(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
    }
    db.blogs = [...db.blogs, newBlog]
    return newBlog.id
  },
  find(id: string) {
      return db.blogs.find(b => b.id === id)
  },
  findAndMap(id: string) {
      const blog = this.find(id)!
      return this.map(blog)
  },
  getAll() {
    return db.blogs;
  },
  del(id: string) {
    const entityToDelete = this.find(id);
    if (entityToDelete) {
      db.blogs = db.blogs.filter((current) => current.id !== entityToDelete.id);
    }
    return;
  },
  put(blog: BlogInputModel, id: string) {
    const entity = this.find(id)!;
    entity.name = blog.name;
    entity.description = blog.description;
    entity.websiteUrl = blog.websiteUrl;
    return entity;
  },
  map(blog: BlogDbType) {
      const blogForOutput: BlogViewModel = {
          id: blog.id,
          description: blog.description,
          websiteUrl: blog.websiteUrl,
          name: blog.name,
      }
      return blogForOutput
  },
}