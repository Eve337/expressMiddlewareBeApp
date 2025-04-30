import { WithId } from 'mongodb';
import { BlogViewModel, PostViewModel } from '../models';
import { BlogDbType, PostDbType } from '../db';

export function mapToBlogViewModel(blog: WithId<BlogDbType>): BlogViewModel {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
  };
}

export function mapToPostViewModel(post: WithId<PostDbType>): PostViewModel {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    createdAt: post.createdAt,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
  };
}
