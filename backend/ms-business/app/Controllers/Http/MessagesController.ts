import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message';
import MessageValidator from 'App/Validators/MessageValidator';

export default class MessagesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMessage:Message=await Message.findOrFail(params.id);
            //Cargar la relación
            await theMessage.load('chat')
            return theMessage; 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Message.query().paginate(page, perPage)
            } else {
                return await Message.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(MessageValidator);
        const theMessage: Message = await Message.create(body);
        return theMessage;
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(MessageValidator);
        const theMessage: Message = await Message.findOrFail(params.id);
        theMessage.user_id = body.user_id;
        theMessage.content_message = body.content_message;
        theMessage.chat_id = body.chat_id;
        return await theMessage.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMessage: Message = await Message.findOrFail(params.id);
        response.status(204);
        return await theMessage.delete();
    }
}
