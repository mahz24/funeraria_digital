import { Chat } from "./chat"
import { User } from "./user.model"

export class Message {
    id?: number
    user_id?: string
    user?: User
    chat_id?: number
    chat?: Chat
    content_message: string
    date_send?:number
}
