import { Benefactor } from "./benefactor.model"
import { Holder } from "./holder.model"
import { User } from "./user.model"

export class Client {
    id?: number
    user_id?: string
    direction?: string
    gender?: string
    is_alive?: boolean
    user?: User
    holder?: Holder
    benefactor?: Benefactor

}
