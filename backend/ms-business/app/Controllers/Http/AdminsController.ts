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
        const body = request.body();
        const theAdmin: Admin = await Admin.create(body);
        return theAdmin;
    }

    public async update({ params, request }: HttpContextContract) {
        const theAdmin: Admin = await Admin.findOrFail(params.id);
        const body = request.body();
        theAdmin.direction = body.direction;
        theAdmin.headquarter_id = body.headquarter_id;
        return await theAdmin.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theAdmin: Admin = await Admin.findOrFail(params.id);
        response.status(204);
        return await theAdmin.delete();
    }
}
