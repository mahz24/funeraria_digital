import { Service } from "./service.model"

export class Relocation {
    id?: number
    service?: Service
    location: string
    status: string
    departure_time: Date
    arrival_time: Date
}
