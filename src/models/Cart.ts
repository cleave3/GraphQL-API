import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import { CartModel } from '../interface/ICart';

const CartSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        default: () => uuidv4()
    },
    storeId: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    productId: {
        type: String,
        required: true
    }
}, { timestamps: true });

CartSchema.virtual('product', {
    ref: 'Product',
    localField: 'productId',
    foreignField: 'id',
    justOne: true
});

CartSchema.set('toObject', { virtuals: true });
CartSchema.set('toJSON', { virtuals: true });

export default model<CartModel>('Cart', CartSchema);
