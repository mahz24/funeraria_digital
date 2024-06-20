import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PlanXService from 'App/Models/PlanXService';
import Service from 'App/Models/Service';
import ServiceValidator from 'App/Validators/ServiceValidator';

export default class ServicesController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theService: Service = await Service.findOrFail(params.id);
            theService.load('burials')
            theService.load('cremations')
            theService.load('relocations')
            return await Service.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Service.query().preload('burials').preload('cremations').preload('relocations').paginate(page, perPage)
            } else {
                return await Service.query().preload('burials').preload('cremations').preload('relocations')
            }

        }

    }

    public async findServices({ params }: HttpContextContract){
        const planService: PlanXService[] = await PlanXService.query().preload('plan')
        let actualplan: PlanXService[] = []
        planService.forEach(actual =>{
            if(actual.plan_id == params.id){
                actualplan.push(actual)
            }
        })
        const service: Service[] = await Service.query()
        let actualService: Service[] = []
        let count: number = 0
        service.forEach(actual =>{
            count = 0
            actualplan.forEach(nuevo =>{
                if(actual.id == nuevo.service_id){
                    count++
                }
            })
            if(count == 0){
                actualService.push(actual)
            }
        })
        return actualService
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(ServiceValidator);
        const theService: Service = await Service.create(body);
        return theService;
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(ServiceValidator);
        const theService: Service = await Service.findOrFail(params.id);
        theService.status = body.status;
        theService.price = body.price;
        theService.description = body.description;
        return await theService.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theService: Service = await Service.findOrFail(params.id);
        response.status(204);
        return await theService.delete();
    }
}
