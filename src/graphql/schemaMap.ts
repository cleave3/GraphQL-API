import 'graphql-import-node'
import cartTypeDefs from './schemas/cart.graphql'
import orderTypeDefs from './schemas/order.graphql'
import regionTypeDefs from './schemas/region.graphql'
import storeTypeDefs from './schemas/store.graphql'
import productTypeDefs from './schemas/product.graphql'
import defaultTypeDefs from './schemas/default.graphql'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolversMap'
import { GraphQLSchema } from 'graphql'

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [defaultTypeDefs, cartTypeDefs, orderTypeDefs, productTypeDefs, storeTypeDefs, regionTypeDefs],
    resolvers
})

export default schema;
