import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Relocation from 'App/Models/Relocation';
import RelocationValidator from 'App/Validators/RelocationValidator';

export default class RelocationsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theRelocation: Relocation = await Relocation.findOrFail(params.id)
            await theRelocation.load('service')
            return await theRelocation;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Relocation.query().paginate(page, perPage)
            } else {
                return await Relocation.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(RelocationValidator);
        let relocation: Relocation = new Relocation()
        relocation.location = body.location
        relocation.status = body.status
        relocation.arrival_time = body.arrival_time
        relocation.departure_time = body.departure_time
        relocation.service_id = body.service.id
        const theRelocation: Relocation = await Relocation.create(relocation);
        return theRelocation;
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(RelocationValidator);
        const theRelocation: Relocation = await Relocation.findOrFail(params.id);
        theRelocation.location = body.location;
        theRelocation.status = body.status;
        theRelocation.departure_time = body.departure_time;
        theRelocation.arrival_time = body.arrival_time;
        theRelocation.service_id = body.service.id
        return await theRelocation.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRelocation: Relocation = await Relocation.findOrFail(params.id);
        response.status(204);
        return await theRelocation.delete();
    }
}
