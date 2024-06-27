import { PostDbType, db } from "../../db"
import { PostInputModel, PostViewModel } from "../../models"
import { blogsRepository } from "../blogs/blogs.repository";

export const postsRepository = {
  create(post: PostInputModel) {
    const blog = blogsRepository.find(post.blogId)!;
    const newPost: PostDbType = {
        id: new Date().toISOString() + Math.random(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: blog.id,
        blogName: blog.name,
    }
    db.posts = [...db.posts, newPost]
    return newPost;
  },
  find(id: string) {
      return db.posts.find(b => b.id === id)
  },
  getAll() {
    return db.blogs;
  },
  del(id: string) {
    const entityToDelete = this.find(id);
    if (entityToDelete) {
      db.posts = db.posts.filter((current) => current.id !== entityToDelete.id);
    }
    return;
  },
  put(post: PostInputModel, id: string) {
    const entityToUpdate = this.find(id)!;
    const blog = blogsRepository.find(post.blogId)!;

    entityToUpdate.blogId = post.blogId;
    entityToUpdate.content = post.content;
    entityToUpdate.shortDescription = post.shortDescription;
    entityToUpdate.blogName = blog.name;

    return entityToUpdate;
  },
}