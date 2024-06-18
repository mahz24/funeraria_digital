import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat'
// import Chat from 'App/Models/Chat'
import Executionservice from 'App/Models/Executionservice'
import Ws from 'App/Services/Ws'
import ExecutionserviceValidator from 'App/Validators/ExecutionserviceValidator'
import axios from 'axios'
import Env from "@ioc:Adonis/Core/Env";


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
                return await Executionservice.query().preload('client').preload('service').paginate(page, perPage)
            } else {
                return await Executionservice.query().preload('service').preload('client')
            }
        }
    }

    public async findServices({ params }: HttpContextContract){
        const theExecution: Executionservice[] = await Executionservice.query().preload('service').preload('client')
        let realExecutions: Executionservice[] = []
        theExecution.forEach(actual =>{
            if(actual.client.id == params.id){
                realExecutions.push(actual)
            }
        })
        return realExecutions
    }

    public async findClients({ params }: HttpContextContract){
        const theExecution: Executionservice[] = await Executionservice.query().preload('service').preload('client')
        let realExecutions: Executionservice[] = []
        theExecution.forEach(actual =>{
            if(actual.service.id == params.id){
                realExecutions.push(actual)
            }
        })
        return realExecutions
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(ExecutionserviceValidator);
        let execution: Executionservice = new Executionservice()
        execution.end_date = body.end_date
        execution.service_id = body.service.id
        execution.client_id = body.client.id
        const theExecutionservice: Executionservice = await Executionservice.create(execution);
        const theExecutionserviceL: Executionservice = await Executionservice.findOrFail(theExecutionservice.id)
             await theExecutionserviceL.load('client')
             await theExecutionserviceL.load('service')
             let userResponse = (await axios.get(`${Env.get("MS_SECURITY_URL")}/users/${theExecutionserviceL.client.user_id}`)).data;
             console.log(userResponse);
             let profileResponse = (await axios.get(`${Env.get("MS_SECURITY_URL")}/profiles/${userResponse._id}`)).data
             const profile = {
                 "Full_name": profileResponse.name + " " + profileResponse.last_name,
                 "Birthday": profileResponse.birthday,
                 "Number_phone": profileResponse.number_phone,
                 "email": userResponse.email
             }
             console.log(profile);
             
        let chat:Chat = new Chat()
        chat.executionservice_id = execution.id 
        chat.name= `${theExecutionserviceL.service.description}   de: ${profile.Full_name}`
        chat.status = "ACTIVO"
        await Chat.create(chat)
        Ws.io.emit('news',{message:'Se creo un chat para este servicio',titulo:`Servicio: ${theExecutionserviceL.service.description}   de: ${theExecutionserviceL.client_id}`,chat:chat.id})
        return theExecutionservice;
    }

    public async update({ params, request }: HttpContextContract) {
        const body = await request.validate(ExecutionserviceValidator);
        const theExecutionservice: Executionservice = await Executionservice.findOrFail(params.id);
        theExecutionservice.end_date = body.end_date;
        theExecutionservice.client_id = body.client.id;
        theExecutionservice.service_id = body.service.id;
        return await theExecutionservice.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theExecutionservice: Executionservice = await Executionservice.findOrFail(params.id);
        response.status(204);
        return await theExecutionservice.delete();
    }
}
