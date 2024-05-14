import { Client } from "./client"
import { Comment } from "./comment"
import { Service } from "./service.model"

export class Executionservice {
    id?: number
    service_id: number
    service?: Service
    client_id: number
    client?: Client
    end_date: Date
    comments?: Comment[]
}
