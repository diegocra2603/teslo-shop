export interface Order {
    id: string;
    subTotal: number;
    tax: number;
    total: number;
    itemsInOrder: number;
    isPaid: boolean;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    transactionId: string | null;
    OrderAddress : OrderAddress | null;
}

export interface OrderAddress {
    firstName: string;
    lastName: string;
}