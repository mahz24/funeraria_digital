import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Burial from 'App/Models/Burial';

export default class BurialsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return await Burial.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Burial.query().paginate(page, perPage)
            } else {
                return await Burial.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theBurial: Burial = await Burial.create(body);
        return theBurial;
    }

    public async update({ params, request }: HttpContextContract) {
        const theBurial: Burial = await Burial.findOrFail(params.id);
        const body = request.body();
        theBurial.burial_date = body.burial_date;
        theBurial.burial_type = body.burial_type;
        theBurial.location = body.location;
        return await theBurial.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBurial: Burial = await Burial.findOrFail(params.id);
        response.status(204);
        return await theBurial.delete();
    }
}
