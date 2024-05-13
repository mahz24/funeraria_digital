import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Benefactor from 'App/Models/Benefactor'
<<<<<<< HEAD
import axios from 'axios';
=======
import BenefactorValidator from 'App/Validators/BenefactorValidator'
>>>>>>> b72509cb7ad698798331367598b8809126d4c78a

export default class BenefactorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theBenefactor: Benefactor = await Benefactor.findOrFail(params.id)
            await theBenefactor.load('client')
            await theBenefactor.load('holder', actualHolder => {
                actualHolder.preload('client')
            })
            return theBenefactor
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Benefactor.query().paginate(page, perPage)
            } else {
                return await Benefactor.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
<<<<<<< HEAD
        const body = request.body();
        // RestTemplate restTemplate = new RestTemplate();
        // String urlPost = baseUrlNotifications + "email_2FA";
        // HttpHeaders headers = new HttpHeaders();
        // headers.setContentType(MediaType.APPLICATION_JSON);
        // String requestBody = "{\"email\":\"" + actualUser.getEmail() +"\",\"token2FA\":\"" + token2FA + "\"}";
        // HttpEntity<String> requestEntity = new HttpEntity<>(requestBody,headers);
        // String requestBody = "{\"email\":\"" + actualUser.getEmail() + "\",\"token2FA\":\"" + token2FA + "\"}";
        // HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
        // ResponseEntity<String> res = restTemplate.postForEntity(urlPost, requestEntity, String.class);
        // System.out.println(res.getBody());
=======
        const body = await request.validate(BenefactorValidator);
>>>>>>> b72509cb7ad698798331367598b8809126d4c78a
        const theBenefactor: Benefactor = await Benefactor.create(body);
        return theBenefactor;
    }

    public async update({ params, request }: HttpContextContract) {
        const theBenefactor: Benefactor = await Benefactor.findOrFail(params.id);
        const body = request.body();
        theBenefactor.isemergency_contact = body.isemergency_contact;
        theBenefactor.isprincipal_benefactor = body.isprincipal_benefactor;
        theBenefactor.holder = body.holder;
        theBenefactor.client = body.client;
        return await theBenefactor.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBenefactor: Benefactor = await Benefactor.findOrFail(params.id);
        response.status(204);
        return await theBenefactor.delete();
    }
}
