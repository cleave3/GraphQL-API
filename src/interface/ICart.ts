import { Document } from "mongoose"
import { IProduct } from "./IProduct";

export interface CartModel extends Document {
    id: string
    storeId: string
    customerId: string
    productId: string
    quantity: number
    product?: IProduct
}


export interface ICart {
    id: string
    storeId: string
    customerId: string
    productId: string
    quantity: number
    product?: IProduct
}