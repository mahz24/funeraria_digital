import { Chat } from "./chat"

export class Message {
    id?: number
    user_id: string
    chat_id: number
    chat?: Chat
    content_message: string
    date_send: Date
}
