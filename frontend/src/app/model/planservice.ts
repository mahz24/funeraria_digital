import { Plan } from "./plan.model";
import { Service } from "./service.model";

export class Planservice {
    id?:number;
    plan_id?:number
    service_id?:number
    service?:Service
    plan?:Plan
}
