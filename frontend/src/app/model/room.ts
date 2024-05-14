import { Headquarter } from "./headquarter"

export class Room {
    id?:number
    name:string
    description:string
    capacity:number
    status:string
    headquarter_id?:number
    headquarter?:Headquarter
}
