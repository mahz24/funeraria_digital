export class Client {
    id?: number
    user_id?: string
    direction?: string
    gender?: string
    is_alive?: boolean
    user?: {
        "Full_name"?: "", 
        "Birthday"?: "", 
        "Number_phone"?: "", 
        "Email"?: ""
    }
    holder?: any
    benefactor?:any
    //executionservices?=ExecutionServices[]
    //subscriptions?:Subscription[]

}
