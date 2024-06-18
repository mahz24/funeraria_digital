import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Admin from "App/Models/Admin";
import axios from 'axios';
import Env from "@ioc:Adonis/Core/Env";
import AdminValidator from 'App/Validators/AdminValidator';

export default class AdminsController {
    public async find({  response }: HttpContextContract) {
        try{
            let admins: Admin[] = await Admin.query()
            .preload("headquarter")
            if (admins && admins.length > 0){
                await Promise.all(
                    admins.map(async (admin) => {
                        let userResponse = await axios.get(`${Env.get("MS_SECURITY_URL")}/users/${admin.user_id}`);
                        admin.user = userResponse.data;
                    })
                );
                return admins
            }else{
                return admins
            }
        }catch(e){
            return response
            .status(500)
            .json({ mensaje: "Error en la busqueda de clientes", data: e });
        }
    }

    public async findOne({ params, response }: HttpContextContract){
        let theAdmin:Admin | null=await Admin.findOrFail(params.id)
        await theAdmin.load('headquarter')
        if(theAdmin != null){
            let userResponse = (await axios.get(`${Env.get("MS_SECURITY_URL")}/users/${theAdmin.user_id}`)).data;
            let profileResponse = (await axios.get(`${Env.get("MS_SECURITY_URL")}/profiles/${theAdmin.user_id}`)).data
            const profile = {
                "Full_name": profileResponse.name + " " + profileResponse.last_name,
                "Birthday": profileResponse.birthday,
                "Number_phone": profileResponse.number_phone,
                "Email": userResponse.email
            }
            theAdmin.user = profile;
            return theAdmin
        }else{
            response.status(400)
            return theAdmin
        }
        
    }

    public async create({ request, response }: HttpContextContract) {
        let body = await request.validate(AdminValidator);
        let api_response = await axios.get(`${Env.get('MS_SECURITY_URL')}/users/${body.user_id}`)
        let user = await api_response.data;
        console.log(user);
        let maybeAdmin: Admin | null;
        try{
            maybeAdmin = await Admin.query()
                        .where("user_id", body.user_id)
                        .first();
        }catch(e){
            maybeAdmin = null
        }            
        if(user != null && maybeAdmin == null){
            let admin: Admin = new Admin()
            admin.user_id = body.user_id
            admin.direction = body.direction
            admin.headquarter_id = body.headquarter.id
            const theAdmin: Admin = await Admin.create(admin);

            return response.status(200).json({
                mensaje: "Se creó correctamente el registro",
                data: theAdmin,
              });
        }else if(user == null && maybeAdmin == null){
            return response.status(400).json({
                mensaje: "No se encontro al usuario referenciado",
                data: body
              });
        }else if(maybeAdmin != null && user != null){
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
        const theAdmin: Admin = await Admin.findOrFail(params.id);
        const body = await request.validate(AdminValidator);
        let api_response = await axios.get(`${Env.get('MS_SECURITY_URL')}/users/${body.user_id}`)
        let user = await api_response.data;
        let maybeAdmin: Admin | null;
        try{
            maybeAdmin = await Admin.query()
                        .where("user_id", body.user_id)
                        .first();
        }catch(e){
            maybeAdmin = null
        } 
        if(user != null && maybeAdmin != null && maybeAdmin.id == params.id){
            theAdmin.user_id = body.user_id;
            theAdmin.direction = body.direction;
            theAdmin.headquarter_id = body.headquarter.id;
            return await theAdmin.save();
        }else if(user != null && maybeAdmin == null){
            theAdmin.user_id = body.user_id;
            theAdmin.direction = body.direction;
            theAdmin.headquarter_id = body.headquarter.id;
            return await theAdmin.save();
        }else if(user == null && maybeAdmin == null){
            return response.status(400).json({
                mensaje: "No se encontro al usuario referenciado",
                data: body
              });
        }else if(maybeAdmin != null && user != null && maybeAdmin.id != params.id){
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
        const theAdmin: Admin = await Admin.findOrFail(params.id);
        response.status(204);
        return await theAdmin.delete();
    }
}
