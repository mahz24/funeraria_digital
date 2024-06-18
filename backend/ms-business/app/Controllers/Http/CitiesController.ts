import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City';
import CityValidator from 'App/Validators/CityValidator';

export default class CitiesController {
    public async find({ params }: HttpContextContract) {
        const theCity: City = await City.findOrFail(params.id)
        await theCity.load('department')
        return theCity
    }

    public async findAll(){
        try {
            let cities: City[] = await City.query()
            .preload('department')
            return cities; 
        } catch (error) {
            console.log(error);
        }
    }

    public async findCities({ params }: HttpContextContract){
        try {
            let cities: City[] = await City.query()
            .preload('department')
            let actualCities: City[] = []
            cities.forEach(city =>{
                if(city.department.id == params.id){
                    actualCities.push(city)
                }
            })
            return actualCities
        } catch (error) {
            console.log(error);
        }
    }


    public async create({ request }: HttpContextContract) {
        const body = await request.validate(CityValidator);
        let city: City = new City()
        city.location = body.location
        city.name = body.name
        city.status = body.status
        city.department_id = body.department.id
        const theCity: City = await City.create(city);
        return theCity;
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(CityValidator);
        const theCity: City = await City.findOrFail(params.id);
        theCity.name = body.name;
        theCity.location = body.location;
        theCity.status = body.status;
        theCity.department_id = body.department.id
        return await theCity.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCity: City = await City.findOrFail(params.id);
        response.status(204);
        return await theCity.delete();
    }
}
