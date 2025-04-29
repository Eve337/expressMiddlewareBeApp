import { Response, Request } from 'express'
import { postsRepository } from '../posts.repository'
import { BasicErrorResponse, PostInputModel, PostViewModel } from '../../../models'
import { validationResult } from 'express-validator'
import { mapToPostViewModel } from '../../../utils/mappers'

export const createPostController = async (req: Request<any, any, PostInputModel>, res: Response) => {
    const errors = validationResult(req)
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
    const newPost = await postsRepository.create(req.body);
    if (!newPost) {
        return res.status(400).json({ errorMessages: [{ message: 'Blog is not found', field: 'blogId' }]})
    }
    return res.status(201)
       .json(mapToPostViewModel(newPost))
}