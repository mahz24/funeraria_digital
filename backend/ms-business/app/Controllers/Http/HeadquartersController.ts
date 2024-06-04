import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Headquarter from 'App/Models/Headquarter';
import HeadquarterValidator from 'App/Validators/HeadquarterValidator';

export default class HeadquartersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theHeadquarter: Headquarter = await Headquarter.findOrFail(params.id)
            await theHeadquarter.load('city')
            return theHeadquarter
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Headquarter.query().paginate(page, perPage)
            } else {
                return await Headquarter.query()
            }
        }
    }

    public async findAll(){
        try {
            let headquarter: Headquarter[] = await Headquarter.query()
            .preload('city')
            return headquarter; 
        } catch (error) {
            console.log(error);
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(HeadquarterValidator);
        let headquarter: Headquarter = new Headquarter()
        headquarter.name = body.name
        headquarter.description = body.description
        headquarter.direction = body.direction
        headquarter.status = body.status
        headquarter.city_id = body.city.id
        const theHeadquarter: Headquarter = await Headquarter.create(headquarter);
        return theHeadquarter;
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(HeadquarterValidator);
        const theHeadquarter: Headquarter = await Headquarter.findOrFail(params.id);
        theHeadquarter.name = body.name;
        theHeadquarter.direction = body.direction;
        theHeadquarter.description = body.description;
        theHeadquarter.status = body.status;
        theHeadquarter.city_id = body.city.id;
        return await theHeadquarter.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theHeadquarter: Headquarter = await Headquarter.findOrFail(params.id);
        response.status(204);
        return await theHeadquarter.delete();
    }
}
