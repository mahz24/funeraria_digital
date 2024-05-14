import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan';
import PlanValidator from 'App/Validators/PlanValidator';

export default class PlansController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return await Plan.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Plan.query().paginate(page, perPage)
            } else {
                return await Plan.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(PlanValidator)
        const thePlan: Plan = await Plan.create(body);
        return thePlan;
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(PlanValidator)
        const thePlan: Plan = await Plan.findOrFail(params.id);
        thePlan.name = body.name;
        thePlan.description = body.description;
        thePlan.price = body.price;
        thePlan.beneficiaries_number=body.beneficiaries_number;
        thePlan.discount = body.discount
        return await thePlan.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thePlan: Plan = await Plan.findOrFail(params.id);
        response.status(204);
        return await thePlan.delete();
    }
}
