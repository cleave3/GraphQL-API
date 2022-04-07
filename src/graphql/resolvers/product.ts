import { IResolvers } from 'graphql-tools'
import { IRequest } from "../../interface/IRequest"
import { AuthenticationError } from "apollo-server-errors"
import {
    MutationAddProductArgs,
    MutationRemoveProductArgs,
    MutationUpdateProductArgs,
    ProductResponse,
    ProductsResponse,
    QueryGetProductArgs,
    QueryGetProductsArgs,
    QuerySearchProductArgs,
    SingleProduct
} from '../graphql'
import Product from "../../models/Product";
import Store from "../../models/Store";

export const ProductResolvers: IResolvers = {
    Query: {
        async getProducts(_: void, { storeId, targetAudience, pageno, limit }: QueryGetProductsArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<ProductsResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                if (!pageno) pageno = 1;
                if (!limit) limit = 20;
                let products: any;
                let total = 0;

                if (targetAudience) {
                    total = await Product.countDocuments({ storeId, targetAudience: { $in: targetAudience } })
                    products = await Product.find({ storeId, targetAudience: { $in: targetAudience } })
                        .skip(Number((pageno - 1) * limit))
                        .limit(Number(limit))
                        .sort({ productName: 'asc' })
                } else {
                    total = await Product.countDocuments({ storeId })
                    products = await Product.find({ storeId })
                        .skip(Number((pageno - 1) * limit))
                        .limit(Number(limit))
                        .sort({ productName: 'asc' })
                }
                return { currentpage: pageno, limit, totalproducts: total, totalpages: Math.ceil(total / limit), products }
            } catch (error) {
                throw error;
            }
        },
        async getProduct(_: void, { productId }: QueryGetProductArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<ProductResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const product: any = await Product.findOne({ id: productId }).populate("related");
                if (!product) throw new Error("product not found");
                return product;
            } catch (error) {
                throw error;
            }
        },
        async searchProduct(_: void, { storeId, searchterm, targetAudience, pageno, limit }: QuerySearchProductArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<ProductsResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                if (!pageno) pageno = 1;
                if (!limit) limit = 20;
                let products: any;
                let total = 0;
                if (targetAudience && storeId) {
                    total = await Product.countDocuments({ storeId, targetAudience: { $in: targetAudience }, productName: new RegExp(searchterm, 'i') })
                    products = await Product.find({
                        storeId,
                        targetAudience: { $in: targetAudience },
                        productName: new RegExp(searchterm, 'i')
                    }).skip(Number((pageno - 1) * limit)).limit(Number(limit)).sort({ productName: 'asc' })
                }
                if (targetAudience && !storeId) {
                    total = await Product.countDocuments({ targetAudience: { $in: targetAudience }, productName: new RegExp(searchterm, 'i') })
                    products = await Product.find({
                        targetAudience: { $in: targetAudience },
                        productName: new RegExp(searchterm, 'i')
                    }).skip(Number((pageno - 1) * limit)).limit(Number(limit)).sort({ productName: 'asc' })

                }
                if (!targetAudience && storeId) {
                    total = await Product.countDocuments({ storeId, productName: new RegExp(searchterm, 'i') })
                    products = await Product.find({
                        storeId,
                        productName: new RegExp(searchterm, 'i')
                    }).skip(Number((pageno - 1) * limit)).limit(Number(limit)).sort({ productName: 'asc' })
                }
                if (!targetAudience && !storeId) {
                    total = await Product.countDocuments({ productName: new RegExp(searchterm, 'i') })
                    products = await Product.find({
                        productName: new RegExp(searchterm, 'i')
                    }).skip(Number((pageno - 1) * limit)).limit(Number(limit)).sort({ productName: 'asc' })
                }
                return { currentpage: pageno, limit, totalproducts: total, totalpages: Math.ceil(total / limit), products }
            } catch (error) {
                throw error;
            }
        }
    },
    Mutation: {
        async addProduct(_: void, { input }: MutationAddProductArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<SingleProduct> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const store = await Store.findOne({ id: input.storeId });
                if (!store) throw new Error("you cannot add product to a non-existing store");
                return await Product.create(input);
            } catch (error) {
                throw error;
            }
        },
        async updateProduct(_: void, { input }: MutationUpdateProductArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<SingleProduct> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const owner = enterprise ? enterprise.uid : user.uid;

                const product = await Product.findOne({ id: input.productId });

                if (!product) throw new Error("product not found");

                const store = await Store.findOne({ owner });

                if (!store) throw new Error("The store with this product does not exist");

                if (store.id !== product.storeId) throw new Error("you are not allowed to perform this operation");

                const data = {
                    price: input.price || product.price,
                    weight: input.weight || product.weight,
                    quantity: input.quantity || product.quantity,
                    mainImage: input.mainImage || product.mainImage,
                    images: input.images || product.images,
                    description: input.description || product.description,
                    targetAudience: input.targetAudience || product.targetAudience,
                    relatedProducts: input.relatedProducts || product.relatedProducts
                }
                await Product.findOneAndUpdate({ id: input.productId }, data);
                return await Product.findOne({ id: input.productId });
            } catch (error) {
                throw error;
            }
        },
        async removeProduct(_: void, { productId }: MutationRemoveProductArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<SingleProduct> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const owner = enterprise ? enterprise.uid : user.uid;

                const product = await Product.findOne({ id: productId });

                if (!product) throw new Error("product not found");

                const store = await Store.findOne({ owner });

                if (!store) throw new Error("The store with this product does not exist");

                if (store.id !== product.storeId) throw new Error("you are not allowed to perform this operation");

                return await Product.findOneAndDelete({ id: productId })
            } catch (error) {
                throw error;
            }
        }
    }
}