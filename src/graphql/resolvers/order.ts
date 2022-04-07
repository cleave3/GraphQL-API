import { IResolvers } from 'graphql-tools'
import { Account, FTransfer, FAuth, Notification, Utils, User, Enterprise } from "@foodmoni.com/helper";
import { IRequest } from "../../interface/IRequest"
import { AuthenticationError } from "apollo-server-errors"
import Order from "../../models/Order";
import Cart from "../../models/Cart";
import {
    MutationInitiateOrderArgs,
    MutationRemoveOrderArgs,
    MutationUpdateOrderArgs,
    OrderResponse,
    Orders,
    OrdersResponse,
    OrderTotalResponse,
    QueryGetOrderArgs,
    QueryGetOrdersArgs,
    Order as OrderRes,
    MutationCompleteOrderArgs
} from '../graphql';
import Region from '../../models/Region';
import Product from '../../models/Product';
import Store from '../../models/Store';

export const OrderResolvers: IResolvers = {
    Query: {
        async getOrder(_: void, { orderId }: QueryGetOrderArgs, { isAuth }: IRequest): Promise<OrderResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const order: any = await Order.findOne({ id: orderId }).populate("region");
                if (!order) throw new Error("order not found");
                return order;
            } catch (error) {
                console.log("error ", error)
                throw error;
            }
        },
        async getOrders(_: void, { storeId, customerId, pageno, limit }: QueryGetOrdersArgs, { isAuth }: IRequest): Promise<OrdersResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                if (!pageno) pageno = 1;
                if (!limit) limit = 20;
                let orders: any;
                let total = 0;

                if (storeId && customerId) {
                    total = await Order.countDocuments({ storeId, customerId })
                    orders = await Order.find({ storeId, customerId })
                        .skip(Number((pageno - 1) * limit))
                        .limit(Number(limit)).sort({ createdAt: 'desc' })
                }

                if (storeId && !customerId) {
                    total = await Order.countDocuments({ storeId })
                    orders = await Order.find({ storeId })
                        .skip(Number((pageno - 1) * limit))
                        .limit(Number(limit)).sort({ createdAt: 'desc' })
                }

                if (!storeId && customerId) {
                    total = await Order.countDocuments({ customerId })
                    orders = await Order.find({ customerId })
                        .skip(Number((pageno - 1) * limit))
                        .limit(Number(limit)).sort({ createdAt: 'desc' })
                }

                if (!storeId && !customerId) {
                    total = await Order.countDocuments()
                    orders = await Order.find()
                        .skip(Number((pageno - 1) * limit))
                        .limit(Number(limit)).sort({ createdAt: 'desc' })
                }

                return { currentpage: pageno, limit, totalorders: total, totalpages: Math.ceil(total / limit), orders }
            } catch (error) {
                throw error;
            }
        }

    },
    Mutation: {
        async initiateOrder(_: void, { input: { storeId, regionId } }: MutationInitiateOrderArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<OrderTotalResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const customerId = enterprise ? enterprise.uid : user.uid;
                let itemsCost = 0;
                let vat = 0;
                const region = await Region.findOne({ id: regionId });
                if (!region) throw new Error("selected region not found");

                const cart = await Cart.find({ storeId, customerId }).populate("product");

                if (cart.length < 1) throw new Error("customer cart is empty");

                for (let i = 0; i < cart.length; i++) {
                    itemsCost += cart[i].product.price * cart[i].quantity;
                }

                return { itemsCost, vat, deliveryFee: region.deliveryFee, totalAmount: (itemsCost + vat + region.deliveryFee) }
            } catch (error) {
                throw error;
            }
        },
        async completeOrder(_: void, { input: { storeId, regionId, telephone, customerName, email, deliveryAddress } }: MutationCompleteOrderArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<OrderRes> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const customerId = enterprise ? enterprise.uid : user.uid;
                const customerAccount = enterprise ? enterprise.accountNumber : user.accountNumber;
                let subtotal = 0;
                let vat = 0;
                let orderDetails = [];
                const cartIds = []

                const region = await Region.findOne({ id: regionId });
                if (!region) throw new Error("selected region not found");

                const cart = await Cart.find({ storeId, customerId }).populate("product");

                if (cart.length < 1) throw new Error("customer cart is empty");

                for (let i = 0; i < cart.length; i++) {
                    const product = await Product.findOne({ id: cart[i].productId });
                    if (!product) continue;
                    orderDetails.push({ product, quantity: cart[i].quantity });
                    subtotal += cart[i].product.price * cart[i].quantity;
                    cartIds.push(cart[i].id);
                }

                const store = await Store.findOne({ id: storeId })

                if (!store) throw new Error("you can not purchase from a store that doesn't exist");

                // put cash on hold
                const holding = await Account.requestHolding({
                    ref: Utils.generateRef(store.storeName),
                    idempotent: "1234567",
                    duration: "1",
                    amount: `${subtotal + vat + region.deliveryFee}`,
                    account: customerAccount,
                    purpose: `Order initiated from ${store.storeName}`,
                });

                if (!holding.status) throw new Error(`Error while attempting to hold funds. Message: ${holding.message}`);

                const data = {
                    storeId,
                    customerId,
                    regionId,
                    telephone,
                    deliveryAddress,
                    vat,
                    deliveryFee: region.deliveryFee,
                    totalAmount: subtotal + vat + region.deliveryFee,
                    customerName,
                    customerAccount,
                    email,
                    orderDetails
                };

                const completedorder = await Order.create(data);

                await Cart.deleteMany({ id: { $in: cartIds } });

                for (let i = 0; i < cart.length; i++) {
                    const newQuantity = cart[i].product.quantity - cart[i].quantity;

                    await Product.findOneAndUpdate({ id: cart[i].product.id }, { quantity: newQuantity })
                }

                // Notify seller and customer of order
                new Notification([
                    {
                        channel: "notification",
                        uid: store.owner,
                        tel: store.phone_1,
                        email: store.email,
                        title: `Order Notification`,
                        desc: `You have a new Order`,
                    },
                    {
                        channel: "notification",
                        uid: customerId,
                        tel: telephone,
                        email: email,
                        title: "Order Notification",
                        desc: `Your Order has been sent, The seller will contact you to verify your order`
                    }
                ]).notify();

                return completedorder;
            } catch (error) {
                throw error;
            }
        },
        async updateOrder(_: void, { input: { orderId, deliveryStatus, status } }: MutationUpdateOrderArgs, { isAuth }: IRequest): Promise<OrderRes> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');

                if (status && !/^(pending|verified|cancelled)$/.test(status)) {
                    throw new Error("status must be one of ['pending', 'verified', 'cancelled']");
                }

                if (deliveryStatus && !/^(pending|processing|shipped|delivered)$/.test(deliveryStatus)) {
                    throw new Error("deliveryStatus must be one of ['pending', 'processing', 'shipped', 'delivered']");
                }

                const order = await Order.findOne({ id: orderId });

                if (deliveryStatus && order.deliveryStatus === "delivered") {
                    throw new Error("deliveryStatus cannot be updated as it has already been delivered")
                }

                if (!order) throw new Error("order not found")

                const data = {
                    deliveryStatus: deliveryStatus || order.deliveryStatus,
                    status: status || order.status
                }

                const store = await Store.findOne({ id: order.storeId })
                if (!store) throw new Error("store associated")

                if (deliveryStatus === "delivered") {
                    const user = await User.getUserByAccount(order.customerAccount);
                    let token = "";
                    if (user.status) {
                        token = new FAuth().generateToken(user.data);
                    } else {
                        const enterprise = await Enterprise.getEnterpriseAccount(order.customerAccount);
                        if (!enterprise.status) throw new Error(`Error get customer Information. Try Again Message: ${enterprise.message}.`);
                        token = new FAuth().generateToken(enterprise.data);
                    }
                    // release cash to seller
                    const transfer = await new FTransfer(token, {
                        ref: Utils.generateRef("FMT"),
                        sender: order.customerAccount,
                        title: "Order Payment",
                        type: "TRANSFER",
                        purpose: `Payment for Order - ${order.id}`,
                        receipts: [{ account: store.paymentAccount, amount: `${order.totalAmount}` }],
                    }).transfer();

                    if (!transfer.status) throw new Error(`Error while attempting to transfer funds to seller. Message: ${transfer.message}`);
                }

                await Order.findOneAndUpdate({ id: orderId }, data);

                // notify customer of order update
                new Notification([
                    {
                        channel: "notification",
                        uid: order.customerId,
                        tel: order.telephone,
                        email: order.email,
                        title: "Order Update Notification",
                        desc: `Your Order was updated. \n\tOrder Status: ${data.status}\n\tDelivery Status: ${data.deliveryStatus}`
                    }
                ]).notify();

                return await Order.findOne({ id: orderId }).populate("region");
            } catch (error) {
                throw error;
            }
        },
        async removeOrder(_: void, { orderId }: MutationRemoveOrderArgs, { isAuth }: IRequest): Promise<Orders> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const order = await Order.findOne({ id: orderId });
                if (!order) throw new Error("order not found");
                return await Order.findOneAndDelete({ id: orderId })
            } catch (error) {
                throw error;
            }
        },
    }
}