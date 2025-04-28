import { Response, Request } from 'express'
import { blogsRepository } from '../blogs.repository'
import { BasicErrorResponse, BlogInputModel, BlogViewModel } from '../../../models'
import { validationResult } from 'express-validator'
import { mapToBlogViewModel } from '../../../utils/mappers'

export const createBlogController = async (req: Request<any, any, BlogInputModel>, res: Response) => {
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
    const newBlogId = await blogsRepository.create(req.body)
    const newBlog = await blogsRepository.findAndMap(String(newBlogId._id))
    if (!newBlog) {
        return res.status(404).json({ errorsMessages: [{ message: 'Blog not found', field: 'blogId' }] })
    }
    return res
    .status(201)
    .json(mapToBlogViewModel(newBlog))
}