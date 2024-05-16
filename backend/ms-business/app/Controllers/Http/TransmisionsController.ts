import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client';
import Executionservice from 'App/Models/Executionservice';
import Transmision from 'App/Models/Transmision';
import TransmisionValidator from 'App/Validators/TransmisionValidator';
import axios from 'axios';
import Env from "@ioc:Adonis/Core/Env";

export default class TransmisionsController {
    public async findOne({params}: HttpContextContract){
        const theTransmision: Transmision = await Transmision.findOrFail(params.id)
        await theTransmision.load('camara')
        await theTransmision.load('executionservice', actualEjecucion =>{
            actualEjecucion.preload('client')
        })
    }

    public async create({ request, response }: HttpContextContract) {
        const body = await request.validate(TransmisionValidator);
        let ejecucion: Executionservice = await Executionservice.findOrFail(body.executionservice_id);
        let cliente: Client = await Client.findOrFail(ejecucion.client_id);
        let puntos = await (await axios.get(`${Env.get('MS_SECURITY_URL')}/fidelidad/${cliente.user_id}`)).data
        if(puntos.puntos > 10){
            const theTransmision: Transmision = await Transmision.create(body);
            await axios.put(`${Env.get('MS_SECURITY_URL')}/fidelidad/${cliente.user_id}`, {
                "puntos": puntos.puntos - 10
            })
            return theTransmision;
        }else{
            return response.status(400).json({
                "mensaje": "No existen para la transmisión"
            })
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTransmision: Transmision = await Transmision.findOrFail(params.id);
        response.status(204);
        return await theTransmision.delete();
    }
}
