import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Camara from 'App/Models/Camara'
import CamaraValidator from 'App/Validators/CamaraValidator';

export default class CamarasController {
    public async findOne({params}: HttpContextContract){
        const theCamara: Camara = await Camara.findOrFail(params.id)
        return theCamara
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(CamaraValidator);
        const theCamara: Camara = await Camara.create(body);
        return theCamara;
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCamara: Camara = await Camara.findOrFail(params.id);
        response.status(204);
        return await theCamara.delete();
    }
}
