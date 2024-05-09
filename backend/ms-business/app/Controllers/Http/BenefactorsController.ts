import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Benefactor from 'App/Models/Benefactor'

export default class BenefactorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theBenefactor: Benefactor = await Benefactor.findOrFail(params.id)
            await theBenefactor.load('client')
            await theBenefactor.load('holder', actualHolder =>{
                actualHolder.preload('client')
            })
            return theBenefactor
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Benefactor.query().paginate(page, perPage)
            } else {
                return await Benefactor.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theBenefactor: Benefactor = await Benefactor.create(body);
        return theBenefactor;
    }

    public async update({ params, request }: HttpContextContract) {
        const theBenefactor: Benefactor = await Benefactor.findOrFail(params.id);
        const body = request.body();
        theBenefactor.isemergency_contact = body.isemergency_contact;
        theBenefactor.isprincipal_benefactor = body.isprincipal_benefactor;
        theBenefactor.holder_id = body.holder_id;
        theBenefactor.client_id = body.client_id;
        return await theBenefactor.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBenefactor: Benefactor = await Benefactor.findOrFail(params.id);
        response.status(204);
        return await theBenefactor.delete();
    }
}
