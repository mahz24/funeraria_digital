import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Admin from "App/Models/Admin";

export default class AdminsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theAdmin:Admin=await Admin.findOrFail(params.id)
            await theAdmin.load('headquarter')
            return theAdmin
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Admin.query().paginate(page, perPage)
            } else {
                return await Admin.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        
        // RestTemplate restTemplate = new RestTemplate();
        // String urlPost = baseUrlNotifications + "email_2FA";
        // HttpHeaders headers = new HttpHeaders();
        // headers.setContentType(MediaType.APPLICATION_JSON);
        // String requestBody = "{\"email\":\"" + actualUser.getEmail() + "\",\"token2FA\":\"" + token2FA + "\"}";
        // HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
        // ResponseEntity<String> res = restTemplate.postForEntity(urlPost, requestEntity, String.class);
        // System.out.println(res.getBody());

        // connection: Env.get('DB_CONNECTION'),

        // connections: {
          /*
          */
        //   mysql: {
        //     client: 'mysql2',
        //     connection: {
        //       host: Env.get('MYSQL_HOST'),
        //       port: Env.get('MYSQL_PORT'),
        //       user: Env.get('MYSQL_USER'),
        //       password: Env.get('MYSQL_PASSWORD', ''),
        //       database: Env.get('MYSQL_DB_NAME'),
        //     },
        //     migrations: {
        //       naturalSort: true,
        //     },
        //     healthCheck: false,
        //     debug: false,
        //   },
      
        // }
        const body = request.body();
        const theAdmin: Admin = await Admin.create(body);
        return theAdmin;
    }

    public async update({ params, request }: HttpContextContract) {
        const theAdmin: Admin = await Admin.findOrFail(params.id);
        const body = request.body();
        theAdmin.direction = body.direction;
        theAdmin.headquarter = body.headquarter;
        return await theAdmin.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theAdmin: Admin = await Admin.findOrFail(params.id);
        response.status(204);
        return await theAdmin.delete();
    }
}
