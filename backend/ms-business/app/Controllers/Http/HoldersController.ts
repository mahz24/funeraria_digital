import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Benefactor from 'App/Models/Benefactor';
import Holder from 'App/Models/Holder';
import HolderValidator from 'App/Validators/HolderValidator';

export default class HoldersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theHolder: Holder = await Holder.findOrFail(params.id)
            await theHolder.load('client')
            return theHolder
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Holder.query().paginate(page, perPage)
            } else {
                return await Holder.query().preload("client")
            }
        }
    }

    public async findPrincipal({ params }:HttpContextContract){
        const theHolder: Holder = await Holder.findOrFail(params.id)
        await theHolder.load('benefactors')
        let theBenefactor: Benefactor = new Benefactor()
        theHolder.benefactors.forEach(actual =>{
            if(actual.isprincipal_benefactor == true){
                theBenefactor = actual
            }
        })
        return theBenefactor
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(HolderValidator);
        let holder: Holder = new Holder()
        holder.client_id = body.client.id
        const theHolder: Holder = await Holder.create(holder);
        return theHolder;
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(HolderValidator);
        const theHolder: Holder = await Holder.findOrFail(params.id);
        theHolder.client_id = body.client.id;
        return await theHolder.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theHolder: Holder = await Holder.findOrFail(params.id);
        response.status(204);
        return await theHolder.delete();
    }
}
