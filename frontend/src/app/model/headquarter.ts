import { City } from "./city"
import { Room } from "./room"

export class Headquarter {
    id?:number
    name:string
    direction:string
    description:string
    status:number
    city?:City
}
