import { Document } from "mongoose"

export interface ProductModel extends Document {
    id: string
    storeId: string
    productName: string
    price: number
    weight: number
    quantity: number
    mainImage: string
    images: [string]
    description: string
    targetAudience: [string]
    relatedProducts: [string]
    createdAt?: string
    updatedAt?: string
}


export interface IProduct {
    id: string
    storeId: string
    productName: string
    price: number
    weight: number
    quantity: number
    mainImage: string
    images: [string]
    description: string
    targetAudience: [string]
    relatedProducts: [string]
    createdAt?: string
    updatedAt?: string
}

