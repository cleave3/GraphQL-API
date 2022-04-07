import { IResolvers } from 'graphql-tools'
import { AuthenticationError } from "apollo-server-errors"
import { IRequest } from "../../interface/IRequest"
import { MutationAddRegionArgs, MutationUpdateRegionArgs, QueryGetRegionArgs, QueryGetRegionsArgs, RegionResponse } from '../graphql'
import Region from "../../models/Region";
import Store from "../../models/Store";

export const RegionResolvers: IResolvers = {
    Query: {
        async getRegions(_: void, { status, storeId }: QueryGetRegionsArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<RegionResponse[]> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                let regions: any;
                if (status) {
                    regions = await Region.find({ status: (status) as any, storeId });
                } else {
                    regions = await Region.find({ storeId });
                }
                return regions;
            } catch (error) {
                throw error;
            }
        },
        async getRegion(_: void, { regionId }: QueryGetRegionArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<RegionResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const region = await Region.findOne({ id: regionId });
                if (!region) throw new Error("Region not found");
                return region;
            } catch (error) {
                throw error;
            }
        },
    },
    Mutation: {
        async addRegion(_: void, { input }: MutationAddRegionArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<RegionResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const exist = await Region.findOne({ storeId: input.storeId, region: input.region });
                if (exist) throw new Error("you already added support for this region in your store");
                return await Region.create(input);
            } catch (error) {
                throw error;
            }
        },
        async updateRegion(_: void, { input }: MutationUpdateRegionArgs, { auth: { user, enterprise }, isAuth }: IRequest): Promise<RegionResponse> {
            try {
                if (!isAuth) throw new AuthenticationError('Authentication failed');
                const owner = enterprise ? enterprise.uid : user.uid;

                if (input.status && !/^(active|disabled)$/.test(input.status)) {
                    throw new Error("status must be one of ['active', 'disabled']");
                }

                const region = await Region.findOne({ id: input.regionId });
                if (!region) throw new Error("Region not found");

                const store = await Store.findOne({ id: region.storeId });

                if (!store) throw new Error("The store with this region does not exist");

                if (store.owner !== owner) throw new Error("you are not allowed to perform this operation");

                const data = {
                    deliveryFee: input.deliveryFee || region.deliveryFee,
                    status: (input.status || region.status) as any
                }

                await Region.findOneAndUpdate({ id: input.regionId }, data);
                return await Region.findOne({ id: input.regionId });
            } catch (error) {
                throw error;
            }
        }
    }
}