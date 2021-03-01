export interface SalesOrderElement {
    id: number;
    date: string;
    price: number;
    customerName: string;
    customerLineFb: string;
    customerPhone: string;
    receiverName: string;
    receiverAddress: string;
    receiverPhone: string;
    deliveryDateTime: Date;
    receiveDateTime: Date;
    deliveryPrice: string;
    flowerFormula: number;
    flowerAvailable: string;
    flowerPrice: number;
    deliveryFee: string;
    totalPrice: string;
    florist: number;
    note: string;
    status: string;
    orderTotal: string;
}

