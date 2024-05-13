import { Service } from "./service.model"

export class Burial {
    id?: number
    location: string
    burial_type: string
    burial_date: Date
    room_id: number
    service_id: number
    service?:Service
    // room?:Room
}
