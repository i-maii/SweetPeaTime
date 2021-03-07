import { FlowerFormula } from "./flower-formula";
import { Promotion } from "./promotion";
import { Florist } from "./florist";

export interface PromotionDetailLog {
    id: number;
    profit: number;
    price: number;
    quantity: number;
    quantitySold: number;
    status: string;
    promotions: Promotion; 
    flowerFormula: FlowerFormula;
    locationName: string;
    sequence: number;
    promotionType: string;
    florist: Florist;
}
