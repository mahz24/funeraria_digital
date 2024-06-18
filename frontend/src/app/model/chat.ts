
import { Executionservice } from "./executionservice"
import { Message } from "./message"

export class Chat {
    id?: number
    name: string
    status?: string
    executionservice_id?: number
    executionservice?:Executionservice
    messages?: Message[]
}
