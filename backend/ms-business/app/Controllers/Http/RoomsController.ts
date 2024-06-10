import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room';
import RoomValidator from 'App/Validators/RoomValidator';

export default class RoomsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theRoom = await Room.findOrFail(params.id)
            await theRoom.load('headquarter')
            return await Room.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Room.query().preload('headquarter').paginate(page, perPage)
            } else {
                return await Room.query().preload('headquarter')
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(RoomValidator);
        const theRoom: Room = await Room.create(body);
        return theRoom;
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(RoomValidator);
        const theRoom: Room = await Room.findOrFail(params.id);
        theRoom.name = body.name;
        theRoom.description = body.description;
        theRoom.capacity = body.capacity;
        theRoom.status = body.status;
        theRoom.headquarter_id = body.headquarter_id
        return await theRoom.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRoom: Room = await Room.findOrFail(params.id);
        response.status(204);
        return await theRoom.delete();
    }
}
