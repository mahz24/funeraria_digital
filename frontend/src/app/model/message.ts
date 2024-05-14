import { Chat } from "./chat"

export class Message {
    id?: number
    user_id: number
    chat_id: number
    chat?: Chat
    content_message: string
    date_send: Date
}
