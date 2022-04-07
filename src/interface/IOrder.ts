import { Document } from "mongoose"
import { IProduct } from "./IProduct";

export type OrderStatus = 'pending' | 'verified' | 'cancelled';
export type DeliveryStatus = 'pending' | 'processing' | 'shipped' | 'delivered';
export type OrderDetails = {
    quantity: number
    product: IProduct
}

export interface OrderModel extends Document {
    id: string
    storeId: string
    customerId: string
    customerName: string
    customerAccount: string
    regionId: string
    deliveryAddress: string
    email: string
    telephone: string
    vat: number
    deliveryFee: number
    totalAmount: number
    status: string
    deliveryStatus: string
    orderDetails: [OrderDetails]
    createdAt?: string
    updatedAt?: string
}

export interface IOrder {
    id: string
    storeId: string
    customerId: string
    customerName: string
    customerAccount: string
    regionId: string
    deliveryAddress: string
    email: string
    telephone: string
    vat: number
    deliveryFee: number
    totalAmount: number
    status: string
    deliveryStatus: string
    orderDetails: [OrderDetails]
    createdAt?: string
    updatedAt?: string
}

