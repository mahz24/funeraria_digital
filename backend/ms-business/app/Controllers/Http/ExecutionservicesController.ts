import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Executionservice from 'App/Models/Executionservice'
import ExecutionserviceValidator from 'App/Validators/ExecutionserviceValidator'

export default class ExecutionservicesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theExecutionservice: Executionservice = await Executionservice.findOrFail(params.id)
            await theExecutionservice.load('client')
            await theExecutionservice.load('service')
            return theExecutionservice
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
        const body = await request.validate(ExecutionserviceValidator);
        const theExecutionservice: Executionservice = await Executionservice.create(body);
        return theExecutionservice;
    }

    public async update({ params, request }: HttpContextContract) {
        const theExecutionservice: Executionservice = await Executionservice.findOrFail(params.id);
        const body = request.body();
        theExecutionservice.end_date = body.end_date;
        theExecutionservice.client_id = body.client_id;
        theExecutionservice.service_id = body.service_id;
        return await theExecutionservice.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theExecutionservice: Executionservice = await Executionservice.findOrFail(params.id);
        response.status(204);
        return await theExecutionservice.delete();
    }
}
