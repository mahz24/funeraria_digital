import { Executionservice } from "./executionservice"

export class Comment {
    id?: number
    description: string
    rating: number
    executionservice_id: number
    executionservice?: Executionservice
    date_comment: Date
}
