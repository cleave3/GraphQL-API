import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import { OrderModel } from '../interface/IOrder';

const OrderSchema: Schema = new Schema({
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
    customerName: {
        type: String,
        required: true,
    },
    customerAccount: {
        type: String,
        required: true,
    },
    regionId: {
        type: String,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    telephone: {
        type: String,
        required: false,
    },
    vat: {
        type: Number,
        required: true,
    },
    deliveryFee: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'verified', 'cancelled'],
        default: 'pending',
    },
    deliveryStatus: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending',
    },
    orderDetails: {
        type: Array,
        required: true,
    }
}, { timestamps: true });


OrderSchema.virtual('region', {
    ref: 'Region',
    localField: 'regionId',
    foreignField: 'id',
});

OrderSchema.set('toObject', { virtuals: true });
OrderSchema.set('toJSON', { virtuals: true });

export default model<OrderModel>('Order', OrderSchema);
