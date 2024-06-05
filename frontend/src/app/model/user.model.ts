import { Role } from "./role.model"

export class User {
    _id?:string //opcional
    email:string
    password:string
    name?: String
    token?:string
    role?: Role
}
