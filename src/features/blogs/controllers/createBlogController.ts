import { Response, Request } from 'express'
import { blogsRepository } from '../blogs.repository'
import { BasicErrorResponse, BlogInputModel, BlogViewModel } from '../../../models'
import { validationResult } from 'express-validator'

export const createBlogController = (req: Request<any, any, BlogInputModel>, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // in case request params meet the validation criteria
        return res.status(400).json({ errorsMessages: errors.array() } )
    };
    const newBlogId = blogsRepository.create(req.body)
    const newBlog = blogsRepository.findAndMap(newBlogId)
    return res
    .status(201)
    .json(newBlog as BlogViewModel)
}