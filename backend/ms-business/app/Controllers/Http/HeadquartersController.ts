import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Headquarter from 'App/Models/Headquarter';

export default class HeadquartersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return await Headquarter.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Headquarter.query().paginate(page, perPage)
            } else {
                return await Headquarter.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theHeadquarter: Headquarter = await Headquarter.create(body);
        return theHeadquarter;
    }

    public async update({ params, request }: HttpContextContract) {
        const theHeadquarter: Headquarter = await Headquarter.findOrFail(params.id);
        const body = request.body();
        theHeadquarter.name = body.name;
        theHeadquarter.capacity = body.capacity;
        theHeadquarter.status = body.status;
        return await theHeadquarter.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theHeadquarter: Headquarter = await Headquarter.findOrFail(params.id);
        response.status(204);
        return await theHeadquarter.delete();
    }
}
