import { Department } from "./department"

export class City {
    id?: number
    name: string
    location: string
    status: string
    department_id: number
    department?: Department
}
