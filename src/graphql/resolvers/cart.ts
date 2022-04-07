import { IResolvers } from 'graphql-tools'
import { IRequest } from "../../interface/IRequest"
import { AuthenticationError } from "apollo-server-errors"
import {
    CartResponse,
    CartsResponse,
    MutationBulkAddArgs,
    MutationAddItemArgs,
    MutationUpdateItemArgs,
    MutationRemoveItemArgs,
    StoreCartResponse,
    QueryGetcartArgs,
    MutationClearCartArgs,
    ClearCartresponse
} from '../graphql'
import Cart from "../../models/Cart";
import Store from '../../models/Store';
import Product from '../../models/Product';

export const CartResolvers: IResolvers = {
    Query: {
        async getcart(_: void, { storeId }: QueryGetcartArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<StoreCartResponse[]> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const customerId = enterprise ? enterprise.uid : user.uid;
                const cart: any = await Cart.find({ storeId, customerId }).populate("product");
                return cart;
            } catch (error) {
                throw error;
            }
        },
        async getcarts(_: void, args: void, { auth: { user, enterprise }, isAuth }: IRequest): Promise<CartsResponse[]> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const customerId = enterprise ? enterprise.uid : user.uid;
                const result = [];
                const stores = await Cart.find({ customerId }).distinct("storeId");

                for (let i = 0; i < stores.length; i++) {
                    const store = await Store.findOne({ id: stores[i] });
                    const productsInCart = await Cart.countDocuments({ customerId, storeId: stores[i] });
                    if (store) {
                        result.push({
                            id: i + 1,
                            storeId: stores[i],
                            customerId: customerId,
                            storename: store.storeName,
                            productsInCart
                        })
                    }
                }
                return result;
            } catch (error) {
                throw error;
            }
        },
    },
    Mutation: {
        async addItem(_: void, { input: { storeId, quantity, productId } }: MutationAddItemArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<CartResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const customerId = enterprise ? enterprise.uid : user.uid;

                const product = await Product.findOne({ id: productId });

                if (!product) throw new Error("product not found");

                if (product.quantity < quantity) throw new Error(`There are only ${product.quantity} left for this item`);

                const incart = await Cart.findOne({ storeId, productId, customerId });
                if (incart) {
                    quantity += incart.quantity;

                    await Cart.findOneAndUpdate({ storeId, productId, customerId }, { quantity });
                    return await Cart.findOne({ storeId, productId, customerId });
                }

                return await Cart.create({ storeId, customerId, quantity, productId });
            } catch (error) {
                throw error;
            }
        },
        async bulkAdd(_: void, { input: { cartdata } }: MutationBulkAddArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<CartResponse[]> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const customerId = enterprise ? enterprise.uid : user.uid;

                const result = [];
                for (let i = 0; i < cartdata.length; i++) {

                    const storeId = cartdata[i].storeId;
                    const productId = cartdata[i].productId;

                    const incart = await Cart.findOne({ storeId, productId, customerId });

                    const product = await Product.findOne({ id: productId });

                    if (!product) continue;

                    let quantity = cartdata[i].quantity;

                    if (incart) {
                        quantity = incart.quantity + cartdata[i].quantity
                        await Cart.findOneAndUpdate({ storeId, productId, customerId }, { quantity });

                        const updatedcart = await Cart.findOne({ storeId, productId, customerId });

                        const check = result.find(c => c?.id === updatedcart?.id);

                        if (check) {
                            result.splice(result.indexOf(check), 1, updatedcart);
                        } else {
                            result.push(updatedcart);
                        }
                    } else {
                        if (product.quantity < cartdata[i].quantity) quantity = product.quantity;

                        result.push(await Cart.create({ storeId, productId, customerId, quantity }));
                    }
                }
                return result;
            } catch (error) {
                throw error;
            }
        },
        async updateItem(_: void, { cartId, quantity }: MutationUpdateItemArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<CartResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const customerId = enterprise ? enterprise.uid : user.uid;

                const incart = await Cart.findOne({ id: cartId, customerId });
                if (!incart) throw new Error("item not found in cart");

                const product = await Product.findOne({ id: incart.productId });

                if (!product) throw new Error("product not found");

                if (product.quantity < quantity) throw new Error(`There are only ${product.quantity} left for this item`);

                await Cart.findOneAndUpdate({ id: cartId, customerId }, { quantity });

                return await Cart.findOne({ id: cartId, customerId });
            } catch (error) {
                throw error;
            }
        },
        async removeItem(_: void, { cartId }: MutationRemoveItemArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<CartResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const customerId = enterprise ? enterprise.uid : user.uid;

                const incart = await Cart.findOne({ id: cartId, customerId });
                if (!incart) throw new Error("item not found in cart");

                return await Cart.findOneAndDelete({ id: cartId, customerId });
            } catch (error) {
                throw error;
            }
        },
        async clearCart(_: void, { storeId }: MutationClearCartArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<ClearCartresponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const customerId = enterprise ? enterprise.uid : user.uid;

                if (storeId) {
                    await Cart.deleteMany({ customerId, storeId });
                } else {
                    await Cart.deleteMany({ customerId });
                }
                return { message: "cart cleared successfully" };
            } catch (error) {
                throw error;
            }
        }
    }
}