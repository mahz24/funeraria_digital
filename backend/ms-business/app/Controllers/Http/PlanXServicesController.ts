import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PlanXService from 'App/Models/PlanXService'

export default class PlanXServicesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const thePlanXService: PlanXService = await PlanXService.findOrFail(params.id)
            await thePlanXService.load('plan')
            await thePlanXService.load('service')
            return thePlanXService
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await PlanXService.query().paginate(page, perPage)
            } else {
                return await PlanXService.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const thePlanXService: PlanXService = await PlanXService.create(body);
        return thePlanXService;
    }

    public async update({ params, request }: HttpContextContract) {
        const thePlanXService: PlanXService = await PlanXService.findOrFail(params.id);
        const body = request.body();
        thePlanXService.date = body.date;
        thePlanXService.service_id = body.service_id
        thePlanXService.plan_id = body.plan_id;
        return await thePlanXService.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thePlanXService: PlanXService = await PlanXService.findOrFail(params.id);
        response.status(204);
        return await thePlanXService.delete();
    }
}
