import { Room } from "./room"
import { Service } from "./service.model"

export class Cremation {
    id?: number
    cremation_date: Date
    status: string
    room_id: number
    service_id: number
    service?: Service
    room?: Room
}
