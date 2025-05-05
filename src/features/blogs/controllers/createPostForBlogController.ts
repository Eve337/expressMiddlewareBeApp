import { Response, Request } from 'express'
import { blogsRepository } from '../blogs.repository'
import { BlogInputModel, PostInputModel } from '../../../models'
import { validationResult } from 'express-validator'
import { mapToBlogViewModel, mapToPostViewModel } from '../../../utils/mappers'
import { postsRepository } from '../../posts/posts.repository'

export const createPostForBlogController = async (req: Request<{id: string}, any, Omit<PostInputModel, 'blogId'>>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(error => {
            const errorObj = error as any;
            return {
                message: errorObj.msg.message || errorObj.msg,
                field: errorObj.msg.field || errorObj.path
            }
        })
        return res.status(400).json({ errorsMessages: formattedErrors } )
    };
    const newPost = await postsRepository.create({ ...req.body, blogId: req.params.id });
    if (!newPost) {
        return res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'blogId' }] })
    }
    return res
    .status(201)
    .json(mapToPostViewModel(newPost));
}