 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from "App/Models/Comment";
import CommentValidator from 'App/Validators/CommentValidator';

export default class CommentsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theComment: Comment = await Comment.findOrFail(params.id)
            await theComment.load('executionservice')
            return theComment
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Comment.query().paginate(page, perPage)
            } else {
                return await Comment.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(CommentValidator);
        const theTheater: Comment = await Comment.create(body);
        return theTheater;
    }

    public async update({ params, request }: HttpContextContract) {
        const theComment: Comment = await Comment.findOrFail(params.id);
        const body = request.body();
        theComment.description = body.description;
        theComment.rating = body.rating;
        return await theComment.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTheater: Comment = await Comment.findOrFail(params.id);
        response.status(204);
        return await theTheater.delete();
    }
}
