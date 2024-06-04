import { Subscription } from "./subscription.model"

export class Bill {
    id?: number
    amount: number
    date: Date
    subscription_id?: number
    subscription?: Subscription
}
