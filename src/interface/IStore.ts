import { Document } from "mongoose"

export interface StoreModel extends Document {
    id: string,
    owner: string
    storeName: string
    phone_1: string
    phone_2?: string
    email: string
    category: string
    description: string
    logo: string
    paymentAccount: string
    createdAt?: string
    updatedAt?: string
}


export interface IStore {
    id: string,
    owner: string
    storeName: string
    phone_1: string
    phone_2?: string
    email: string
    category: string
    description: string
    logo: string
    paymentAccount: string
    createdAt?: string
    updatedAt?: string
}