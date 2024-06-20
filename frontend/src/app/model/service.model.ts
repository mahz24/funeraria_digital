import { Burial } from "./burial";
import { Cremation } from "./cremation";
import { Relocation } from "./relocation";

export class Service {
    id?: number;
    description: string;
    price: number;
    status?: string;
    burials?: Burial[]
    cremations?: Cremation[]
    relocations?: Relocation[]
}
