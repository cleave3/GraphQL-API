import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import { RegionModel } from '../interface/IRegion';

const RegionSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        default: () => uuidv4()
    },
    storeId: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: String,
        enum: ['active', 'disabled'],
        required: true,
        default: 'active',
    }
}, { timestamps: true });

export default model<RegionModel>('Region', RegionSchema);
