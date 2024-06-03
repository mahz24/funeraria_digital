import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client';
import axios from 'axios';
import Env from "@ioc:Adonis/Core/Env";
import ClientValidator from 'App/Validators/ClientValidator';

export default class ClientsController {
    public async find({ /*request,*/ response }: HttpContextContract) {
        try{
            //const page = request.input("page", 1);
            //const perPage = request.input("per_page", 20);
            let clients: Client[] = await Client.query()
            .preload("benefactor")
            .preload("holder")
            //.paginate(page, perPage);
            if (clients && clients.length > 0){
                await Promise.all(
                    clients.map(async (client) => {
                        let userResponse = await axios.get(`${Env.get("MS_SECURITY_URL")}/users/${client.user_id}`);
                        client.user = userResponse.data;
                    })
                );
                return clients;
            }else{
                return response.status(404).json({
                    mensaje: "No se encontraron registros de clientes",
                    data: clients,
                  })
            }
        }catch(e){
            return response
            .status(500)
            .json({ mensaje: "Error en la busqueda de clientes", data: e });
        }
    }

    public async findOne({ params, response }: HttpContextContract){
        let theClient:Client | null=await Client.findOrFail(params.id)
        await theClient.load('holder', actualHolder =>{
            actualHolder.preload('benefactors')})
        await theClient.load('benefactor', actualBenefactor => {
            actualBenefactor.preload('holder')})
        if(theClient != null){
            let userResponse = (await axios.get(`${Env.get("MS_SECURITY_URL")}/users/${theClient.user_id}`)).data;
            let profileResponse = (await axios.get(`${Env.get("MS_SECURITY_URL")}/profiles/${theClient.user_id}`)).data
            const profile = {
                "Full_name": profileResponse.name + " " + profileResponse.last_name,
                "Birthday": profileResponse.birthday,
                "Number_phone": profileResponse.number_phone,
                "Email": userResponse.email
            }
            theClient.user = profile;
            return response.status(200).json(theClient);
        }else{
            return response.status(400).json({ mensaje: "Registro del cliente no fue encontrado", data: theClient });
        }
        
    }

    public async create({ request, response }: HttpContextContract) {
        let body = await request.validate(ClientValidator);
        let api_response = await axios.get(`${Env.get('MS_SECURITY_URL')}/users/${body.user_id}`)
        let user = await api_response.data;
        console.log(user);
        let maybeClient: Client | null;
        try{
            maybeClient = await Client.query()
                        .where("user_id", body.user_id)
                        .first();
        }catch(e){
            maybeClient = null
        }            
        if(user != null && maybeClient == null){
            const theClient: Client = await Client.create(body);
            return response.status(200).json({
                mensaje: "Se creó correctamente el registro",
                data: theClient,
              });
        }else if(user == null && maybeClient == null){
            return response.status(400).json({
                mensaje: "No se encontro al usuario referenciado",
                data: body
              });
        }else if(maybeClient != null && user != null){
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
        const theClient: Client = await Client.findOrFail(params.id);
        const body = await request.validate(ClientValidator);
        let api_response = await axios.get(`${Env.get('MS_SECURITY_URL')}/users/${body.user_id}`)
        let user = await api_response.data;
        let maybeClient: Client | null;
        try{
            maybeClient = await Client.query()
                        .where("user_id", body.user_id)
                        .first();
        }catch(e){
            maybeClient = null
        } 
        if(user != null && maybeClient != null && maybeClient.id == params.id){
            theClient.user_id = body.user_id;
            theClient.direction = body.direction;
            theClient.gender = body.gender;
            theClient.is_alive = body.is_alive;
            return await theClient.save();
        }else if(user != null && maybeClient == null){
            theClient.user_id = body.user_id;
            theClient.direction = body.direction;
            theClient.gender = body.gender;
            theClient.is_alive = body.is_alive;
            return await theClient.save();
        }else if(user == null && maybeClient == null){
            return response.status(400).json({
                mensaje: "No se encontro al usuario referenciado",
                data: body
              });
        }else if(maybeClient != null && user != null && maybeClient.id != params.id){
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
        const theClient: Client = await Client.findOrFail(params.id);
        response.status(204);
        return await theClient.delete();
    }
}
