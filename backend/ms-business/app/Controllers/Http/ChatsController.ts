import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';
import ChatValidator from 'App/Validators/ChatValidator';

export default class ChatsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theChat: Chat = await Chat.findOrFail(params.id)
            await theChat.load('executionservice')
            return theChat
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Chat.query().paginate(page, perPage)
            } else {
                return await Chat.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(ChatValidator);
        const theChat: Chat = await Chat.create(body);
        return theChat;
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(ChatValidator);
        const theChat: Chat = await Chat.findOrFail(params.id);
        theChat.name = body.name;
        theChat.status = body.status;
        return await theChat.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCity: Chat = await Chat.findOrFail(params.id);
        response.status(204);
        return await theCity.delete();
    }
}
