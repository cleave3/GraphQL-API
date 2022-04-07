import { Document } from "mongoose"

export type RegionStatus = "active" | "disabled";

export interface RegionModel extends Document {
    id: string
    storeId: string
    region: string
    deliveryFee: number
    status: RegionStatus
    createdAt?: string
    updatedAt?: string
}


export interface IRegion {
    id: string
    storeId: string
    region: string
    deliveryFee: number
    status: RegionStatus
    createdAt?: string
    updatedAt?: string
}