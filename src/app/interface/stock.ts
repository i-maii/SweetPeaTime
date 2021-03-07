import { Flower } from "./flower";
import { Florist } from "./florist";

export interface Stock {
    id: number;
    flower: Flower;
    quantity: number;
    unit: string;
    lot: Date;
    reserve: number;
    florist: Florist;
}