export interface SalesOrder {
    id: number;
    date: string;
    price: number;
    customerFirstName: string;
    customerLastName: string;
    customerPhone: string;
    receiverFirstName: string;
    receiverLastName: string;
    receiverAddress: string;
    receiverPhone: string;
    note: string;
    deliveryDateTime: string;
    receiverDateTime: string;
    status: string;
    deliveryPrice: number;
}