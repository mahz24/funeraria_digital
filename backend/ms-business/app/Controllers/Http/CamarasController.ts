import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Camara from 'App/Models/Camara'
import CamaraValidator from 'App/Validators/CamaraValidator'

export default class CamarasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theCamara: Camara = await Camara.findOrFail(params.id)
            return theCamara
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Camara.query().paginate(page, perPage)
            } else {
                return await Camara.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(CamaraValidator);
        const theCamara: Camara = await Camara.create(body);
        return theCamara;
    }

}
