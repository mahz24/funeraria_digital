import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Benefactor from 'App/Models/Benefactor'
import BenefactorValidator from 'App/Validators/BenefactorValidator'

export default class BenefactorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theBenefactor: Benefactor = await Benefactor.findOrFail(params.id)
            await theBenefactor.load('client')
            await theBenefactor.load('holder')
            return theBenefactor
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Benefactor.query().preload('client').preload('holder').paginate(page, perPage)
            } else {
                return await Benefactor.query().preload('client').preload('holder')
            }
        }
    }

    public async findBenefactors({ params }: HttpContextContract){
        const theBenefactors: Benefactor[] = await Benefactor.query().preload('client').preload('holder')
        let realBenefactors: Benefactor[] = []
        theBenefactors.forEach(actual =>{
            if(actual.holder_id == params.id){
                realBenefactors.push(actual)
            }
        })
        return realBenefactors
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(BenefactorValidator);
        let beneficiario: Benefactor = new Benefactor()
        beneficiario.isemergency_contact = body.isemergency_contact
        beneficiario.isprincipal_benefactor = body.isprincipal_benefactor
        beneficiario.holder_id = body.holder.id
        beneficiario.client_id = body.client.id
        const theBenefactor: Benefactor = await Benefactor.create(beneficiario);
        return theBenefactor;
    }

    public async update({ params, request }: HttpContextContract) {
        const theBenefactor: Benefactor = await Benefactor.findOrFail(params.id);
        const body = await request.validate(BenefactorValidator);
        theBenefactor.isemergency_contact = body.isemergency_contact;
        theBenefactor.isprincipal_benefactor = body.isprincipal_benefactor;
        theBenefactor.holder_id = body.holder.id;
        theBenefactor.client_id = body.client.id;
        return await theBenefactor.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBenefactor: Benefactor = await Benefactor.findOrFail(params.id);
        response.status(204);
        return await theBenefactor.delete();
    }
}
