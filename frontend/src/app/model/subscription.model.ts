import { Client } from "./client"
import { Plan } from "./plan.model"

export class Subscription {
    id?: number
    activation_date: Date
    client?: Client
    plan?: Plan
}
