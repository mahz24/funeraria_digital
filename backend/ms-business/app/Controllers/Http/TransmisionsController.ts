import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transmision from 'App/Models/Transmision'
import TransmisionValidator from 'App/Validators/TransmisionValidator'
import axios from 'axios'
import Env from "@ioc:Adonis/Core/Env";
import ExecutionservicesController from './ExecutionservicesController';
import Executionservice from 'App/Models/Executionservice';
import Client from 'App/Models/Client';

export default class TransmisionsController {
    private executionserviceController: ExecutionservicesController;
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theTransmission: Transmision = await Transmision.findOrFail(params.id)
            await theTransmission.load('executionservice')
            await theTransmission.load('camara')
            return theTransmission
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Transmision.query().paginate(page, perPage)
            } else {
                return await Transmision.query()
            }
        }
    }
    public async create({ request, response }: HttpContextContract) {
        const body = await request.validate(TransmisionValidator);
        const theExecutionservice: Executionservice = await Executionservice.findOrFail(body.executionservice_id)
        const theClient: Client = await Client.findOrFail(theExecutionservice.client_id)
        let fidelidad = (await axios.get(`${Env.get("MS_SECURITY_URL")}/fidelidades/${theClient.user_id}`)).data;
        if (fidelidad.puntos >= 10) {
            const theTransmision: Transmision = await Transmision.create(body);
            const requestBody = {
                puntos: fidelidad.puntos-10
            };
            const headers = {
                'Content-Type': 'application/json'
            };
            await axios.put(`${Env.get("MS_SECURITY_URL")}/fidelidades/${fidelidad._id}`, requestBody, { headers: headers })
            return theTransmision;
        } else {
            return response.status(404).json({
                mensaje: "No se cuenta con los puntos suficientes"
            })
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSubscription: Transmision = await Transmision.findOrFail(params.id);
        response.status(204);
        return await theSubscription.delete();
    }

}
