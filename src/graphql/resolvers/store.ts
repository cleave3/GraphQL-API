import { IResolvers } from 'graphql-tools'
import { AuthenticationError } from "apollo-server-errors"
import { IRequest } from "../../interface/IRequest"
import { MutationDeleteStoreArgs, MutationRegisterStoreArgs, MutationUpdateStoreArgs, QueryGetStoreArgs, QueryGetStoresArgs, QuerySearchStoresArgs, Store as StoreMutationResponse, StoreResponse, StoresResponse } from '../graphql'
import Store from "../../models/Store";
import Region from "../../models/Region";

export const StoreResolvers: IResolvers = {
    Query: {
        async getStores(_: void, args: QueryGetStoresArgs, { isAuth }: IRequest): Promise<StoresResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                let { category, pageno, limit } = args;
                if (!pageno) pageno = 1;
                if (!limit) limit = 20;

                let stores = [];
                let total = 0;

                if (category && category !== "all") {
                    total = await Store.countDocuments({ category });
                    stores = await Store.find({ category })
                        .skip(Number((pageno - 1) * limit))
                        .limit(Number(limit))
                        .sort({ storeName: 'asc' });
                } else {
                    total = await Store.countDocuments();
                    stores = await Store.find()
                        .skip(Number((pageno - 1) * limit))
                        .limit(Number(limit))
                        .sort({ storeName: 'asc' });
                }

                return { currentpage: pageno, limit, totalstores: total, totalpages: Math.ceil(total / limit), stores }

            } catch (error) {
                throw error;
            }
        },
        async getStore(_: void, { storeId }: QueryGetStoreArgs, { isAuth }: IRequest): Promise<StoreResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const store = await Store.findOne({ id: storeId });
                if (!store) throw new Error("store not found");
                const supportedRegions = await Region.find({ storeId })
                return { store, supportedRegions }
            } catch (error) {
                throw error;
            }
        },
        async ownerStore(_: void, { storeId }: QueryGetStoreArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<StoreResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const owner = enterprise ? enterprise.uid : user.uid;
                const store = await Store.findOne({ owner });
                if (!store) throw new Error("store not found");
                const supportedRegions = await Region.find({ storeId: store.id })
                return { store, supportedRegions }
            } catch (error) {
                throw error;
            }
        },
        async searchStores(_: void, { searchterm }: QuerySearchStoresArgs, { isAuth }: IRequest): Promise<StoreMutationResponse[]> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const stores = await Store.find({ storeName: new RegExp(searchterm, 'i') })
                return stores
            } catch (error) {
                throw error;
            }
        },
    },
    Mutation: {
        async registerStore(_: void, args: MutationRegisterStoreArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<StoreMutationResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const owner = enterprise ? enterprise.uid : user.uid;
                const paymentAccount = enterprise ? enterprise.incomeAccountNumber : user.accountNumber;

                const { input: { storeName, phone_1, phone_2, email, category, description, logo } } = args

                const hasAStore = await Store.findOne({ owner });
                if (hasAStore) throw new Error("You already have a store registered to your account");

                const isExist = await Store.findOne({ storeName });
                if (isExist) throw new Error("Storename is already taken");

                const data = { owner, storeName, phone_1, phone_2, email, category, description, logo, paymentAccount }

                const createdStore = await Store.create(data);

                return createdStore;

            } catch (error) {
                throw error;
            }
        },
        async updateStore(_: void, args: MutationUpdateStoreArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<StoreMutationResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const owner = enterprise ? enterprise.uid : user.uid;
                const { input: { storeId, storeName, phone_1, phone_2, email, category, description, logo } } = args

                const store = await Store.findOne({ id: storeId });
                if (!store) throw new Error("store not found");

                if (store.owner !== owner) throw new Error("you are not allowed to perform this operation")

                const data = {
                    storeName: storeName || store.storeName,
                    phone_1: phone_1 || store.phone_1,
                    phone_2: phone_2 || store.phone_2,
                    email: email || store.email,
                    category: category || store.category,
                    description: description || store.description,
                    logo: logo || store.logo
                }

                await Store.findOneAndUpdate({ id: storeId }, { $set: data });

                const updatedStore = await Store.findOne({ id: storeId });

                return updatedStore;

            } catch (error) {
                throw error;
            }
        },
        async deleteStore(_: void, { storeId }: MutationDeleteStoreArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<StoreMutationResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const owner = enterprise ? enterprise.uid : user.uid;

                const store = await Store.findOne({ id: storeId });
                if (!store) throw new Error("store not found");

                if (store.owner !== owner) throw new Error("you are not allowed to perform this operation")

                return await Store.findOneAndDelete({ id: storeId });

            } catch (error) {
                throw error;
            }
        }

    }
}