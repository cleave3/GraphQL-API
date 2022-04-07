import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import { StoreModel } from '../interface/IStore';

const StoreSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        default: () => uuidv4()
    },
    owner: {
        type: String,
        required: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    phone_1: {
        type: String,
        required: true,
    },
    phone_2: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paymentAccount: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: false,
    },
}, { timestamps: true });

export default model<StoreModel>('Store', StoreSchema);