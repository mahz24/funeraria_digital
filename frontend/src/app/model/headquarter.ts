import { City } from "./city"
import { Room } from "./room"

export class Headquarter {
    id?:number
    name:string
    direction:string
    description:string
    capacity:number
    status:string
    city_id:number
    city?:City
    rooms?:Room[]
}
