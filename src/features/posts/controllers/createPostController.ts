import { Response, Request } from 'express'
import { postsRepository } from '../posts.repository'
import { BasicErrorResponse, PostInputModel, PostViewModel } from '../../../models'
import { validationResult } from 'express-validator'

export const createPostController = (req: Request<any, any, PostInputModel>, res: Response<PostViewModel | BasicErrorResponse>) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // in case request params meet the validation criteria
        return res.status(400).json({ errors: errors.array() } as BasicErrorResponse)
    };
    const newPost = postsRepository.create(req.body);

    res.status(201)
       .json(newPost)
    return;
}