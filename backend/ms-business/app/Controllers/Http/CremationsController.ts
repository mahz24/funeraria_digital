import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremation from 'App/Models/Cremation';
import CremationValidator from 'App/Validators/CremationValidator';

export default class CremationsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theCremation: Cremation = await Cremation.findOrFail(params.id)
            await theCremation.load('service')
            await theCremation.load('room')
            return theCremation;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Cremation.query().paginate(page, perPage)
            } else {
                return await Cremation.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(CremationValidator);
        let cremation: Cremation = new Cremation()
        cremation.cremation_date = body.cremation_date;
        cremation.status = body.status;
        cremation.room_id = body.room.num
        cremation.service_id = body.service_id;
        const theCremation: Cremation = await Cremation.create(cremation);
        return theCremation;
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(CremationValidator);
        const theCremation: Cremation = await Cremation.findOrFail(params.id);
        theCremation.cremation_date = body.cremation_date;
        theCremation.status = body.status;
        theCremation.room_id = body.room.num
        theCremation.service_id = body.service_id;
        return await theCremation.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCremation: Cremation = await Cremation.findOrFail(params.id);
        response.status(204);
        return await theCremation.delete();
    }
}
