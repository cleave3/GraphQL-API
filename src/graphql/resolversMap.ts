import { IResolvers } from 'graphql-tools'
import { merge } from 'lodash'
import GraphQLDateTime from 'graphql-type-datetime';
import { StoreResolvers } from './resolvers/store';
import { RegionResolvers } from './resolvers/region';
import { ProductResolvers } from './resolvers/product';
import { CartResolvers } from './resolvers/cart';
import { OrderResolvers } from './resolvers/order';

const resolverMap: IResolvers = merge(StoreResolvers, RegionResolvers, ProductResolvers, CartResolvers, OrderResolvers, { DateTime: GraphQLDateTime });

export default resolverMap
