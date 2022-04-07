import { gql } from "apollo-server-express";

export default gql`
    type Store {
        id: String!
        owner: String!
        storeName: String!
        phone_1: String!
        phone_2: String
        email: String!
        category: String!
        description: String!
        logo: String
        createdAt: DateTime
        updatedAt: DateTime
    }

    extend type Query {
        getStores(category: String, pageno: Int, limit: Int): StoresResponse
        getStore(storeId: String!): StoreResponse
        ownerStore: StoreResponse
        searchStores(searchterm: String!): [Store!]!
    }

    extend type Mutation {
        registerStore(input: StoreInput!): Store
        updateStore(input: StoreUpdateInput!): Store
        deleteStore(storeId: String!): Store
    }

    input StoreInput {
        storeName: String!
        phone_1: String!
        phone_2: String
        email: String!
        category: String!
        description: String!
        logo: String
    }

    input StoreUpdateInput {
        storeId: String!
        storeName: String
        phone_1: String
        phone_2: String
        email: String
        category: String
        description: String
        logo: String
    }

    type StoresResponse {
        currentpage: Int!
        totalpages: Int!
        totalstores: Int!
        limit: Int!
        stores: [Store]
    }

    type StoreResponse {
        store: Store
        supportedRegions: [Region!]!
    }

`;