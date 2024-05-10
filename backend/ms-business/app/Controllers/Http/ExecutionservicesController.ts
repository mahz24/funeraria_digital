import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Executionservice from 'App/Models/Executionservice';

export default class ExecutionServicesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return await Executionservice.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Executionservice.query().paginate(page, perPage)
            } else {
                return await Executionservice.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theExecution: Executionservice = await Executionservice.create(body);
        return theExecution;
    }

    public async update({ params, request }: HttpContextContract) {
        const theExecution: Executionservice = await Executionservice.findOrFail(params.id);
        const body = request.body();
        theExecution.service_id = body.service_id;
        theExecution.client_id = body.client_id;
        theExecution.end_date = body.burial_date;
        return await theExecution.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theExecution: Executionservice= await Executionservice.findOrFail(params.id);
        response.status(204);
        return await theExecution.delete();
    }
}
