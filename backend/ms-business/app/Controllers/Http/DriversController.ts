import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver';
import Env from "@ioc:Adonis/Core/Env";
import axios from 'axios';
import DriverValidator from 'App/Validators/DriverValidator';

export default class DriversController {
    public async find({ request, response }: HttpContextContract) {
        try{
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);
            let drivers: Driver[] = await Driver.query()
            .preload("headquarter")
            .paginate(page, perPage);
            if (drivers && drivers.length > 0){
                await Promise.all(
                    drivers.map(async (admin) => {
                        let userResponse = await axios.get(`${Env.get("MS_SECURITY_URL")}/users/${admin.user_id}`);
                        admin.user = userResponse.data;
                    })
                );
                return response.status(200).json({
                    mensaje: "Registro completo de clientes",
                    data: drivers
                })
            }else{
                return response.status(404).json({
                    mensaje: "No se encontraron registros de clientes",
                    data: drivers,
                  })
            }
        }catch(e){
            return response
            .status(500)
            .json({ mensaje: "Error en la busqueda de clientes", data: e });
        }
    }

    public async findOne({ params, response }: HttpContextContract){
        let theDriver:Driver | null=await Driver.findOrFail(params.id)
        await theDriver.load('headquarter')
        if(theDriver != null){
            let userResponse = (await axios.get(`${Env.get("MS_SECURITY_URL")}/users/${theDriver.user_id}`)).data;
            let profileResponse = (await axios.get(`${Env.get("MS_SECURITY_URL")}/profiles/${theDriver.user_id}`)).data
            const profile = {
                "Full_name": profileResponse.name + " " + profileResponse.last_name,
                "Birthday": profileResponse.birthday,
                "Number_phone": profileResponse.number_phone,
                "Email": userResponse.email
            }
            theDriver.user = profile;
            return response.status(200).json({ mensaje: "Registro del cliente fue encontrado", data: theDriver });
        }else{
            return response.status(400).json({ mensaje: "Registro del cliente no fue encontrado", data: theDriver });
        }
        
    }

    public async create({ request, response }: HttpContextContract) {
        let body = await request.validate(DriverValidator);
        let api_response = await axios.get(`${Env.get('MS_SECURITY_URL')}/users/${body.user_id}`)
        let user = await api_response.data;
        console.log(user);
        let maybeDriver: Driver | null;
        try{
            maybeDriver = await Driver.query()
                        .where("user_id", body.user_id)
                        .first();
        }catch(e){
            maybeDriver = null
        }            
        if(user != null && maybeDriver == null){
            const theDriver: Driver = await Driver.create(body);
            return response.status(200).json({
                mensaje: "Se creó correctamente el registro",
                data: theDriver,
              });
        }else if(user == null && maybeDriver == null){
            return response.status(400).json({
                mensaje: "No se encontro al usuario referenciado",
                data: body
              });
        }else if(maybeDriver != null && user != null){
            return response.status(400).json({
                mensaje: "Este usuario ya se encuentra en uso",
                data: body,
              });
        }else{
            return response.status(400).json({
                mensaje: "Error de creación",
                data: body,
              });
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        const theDriver: Driver = await Driver.findOrFail(params.id);
        const body = await request.validate(DriverValidator);
        let api_response = await axios.get(`${Env.get('MS_SECURITY_URL')}/users/${body.user_id}`)
        let user = await api_response.data;
        let maybeDriver: Driver | null;
        try{
            maybeDriver = await Driver.query()
                        .where("user_id", body.user_id)
                        .first();
        }catch(e){
            maybeDriver = null
        } 
        if(user != null && maybeDriver != null && maybeDriver.id == params.id){
            theDriver.user_id = body.user_id;
            theDriver.direction = body.direction;
            theDriver.headquarter_id = body.headquarter_id;
            return await theDriver.save();
        }else if(user != null && maybeDriver == null){
            theDriver.user_id = body.user_id;
            theDriver.direction = body.direction;
            theDriver.headquarter_id = body.headquarter_id;
            return await theDriver.save();
        }else if(user == null && maybeDriver == null){
            return response.status(400).json({
                mensaje: "No se encontro al usuario referenciado",
                data: body
              });
        }else if(maybeDriver != null && user != null && maybeDriver.id != params.id){
            return response.status(400).json({
                mensaje: "Este usuario ya se encuentra en uso",
                data: body,
              });
        }else{
            return response.status(400).json({
                mensaje: "Error de actualización",
                data: body,
              });
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDriver: Driver = await Driver.findOrFail(params.id);
        response.status(204);
        return await theDriver.delete();
    }
}
