import { Client } from "./client"
import { Holder } from "./holder.model"

export class Benefactor {
    id?: number
    isprincipal_benefactor: boolean
    isemergency_contact: boolean
    client_id?: number
    holder_id?: number
    client?: Client
    holder?: Holder
}
