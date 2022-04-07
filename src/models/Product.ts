import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import { ProductModel } from '../interface/IProduct';

const ProductSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        default: () => uuidv4()
    },
    storeId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 1,
    },
    mainImage: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    targetAudience: {
        type: Array,
        required: true,
    },
    relatedProducts: [{ type: String }]
}, { timestamps: true });

ProductSchema.virtual('related', {
    ref: 'Product',
    localField: 'relatedProducts',
    foreignField: 'id',
});

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });

export default model<ProductModel>('Product', ProductSchema);
