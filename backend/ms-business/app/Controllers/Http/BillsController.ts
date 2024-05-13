import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bill from 'App/Models/Bill';
import BillValidator from 'App/Validators/BillValidator';

export default class BillsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theBill: Bill = await Bill.findOrFail(params.id)
            await theBill.load('subscription', actualSuscription => {
                actualSuscription.preload('client', actualClient =>{
                    actualClient.preload('holder')
                })
                actualSuscription.preload('plan')
            })
            return theBill
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Bill.query().paginate(page, perPage)
            } else {
                return await Bill.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(BillValidator);
        const theBill: Bill = await Bill.create(body);
        return theBill;
    }

    public async update({ params, request }: HttpContextContract) {
        const theBill: Bill = await Bill.findOrFail(params.id);
        const body = request.body();
        theBill.amount = body.amount;
        theBill.date = body.date;
        return await theBill.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBill: Bill = await Bill.findOrFail(params.id);
        response.status(204);
        return await theBill.delete();
    }
}
