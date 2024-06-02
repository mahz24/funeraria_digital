import { Room } from "./room"
import { Service } from "./service.model"

export class Burial {
    id?: number
    location: string
    burial_type: string
    burial_date: Date
    service?:Service
    room?:Room

}
