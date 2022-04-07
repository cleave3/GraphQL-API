import { gql } from "apollo-server-express";

export default gql`
    type Product {
        id: String!
        storeId: String!
        productName: String!
        price: Float!
        weight: Float!
        quantity: Int!
        mainImage: String!
        images: [String!]!
        description: String!
        targetAudience: [String!]!
        relatedProducts: [String!]!
        createdAt: DateTime
        updatedAt: DateTime
    }

    extend type Query {
        getProducts(storeId: String!,targetAudience: [String!],pageno: Int,limit: Int): ProductsResponse!
        getProduct(productId: String!): ProductResponse
        searchProduct(searchterm: String!,storeId: String, targetAudience: [String!],pageno: Int,limit: Int): ProductsResponse!
    }

    extend type Mutation {
        addProduct(input: ProductInput!): SingleProduct
        updateProduct(input: ProductUpdateInput!): SingleProduct
        removeProduct(productId: String!): SingleProduct
    }

    input ProductInput {
        storeId: String!
        productName: String!
        price: Float!
        weight: Float!
        quantity: Int!
        mainImage: String!
        images: [String!]!
        description: String!
        targetAudience: [String!]!
        relatedProducts: [String!]
    }

    input ProductUpdateInput {
        productId: String!
        productName: String
        price: Float
        weight: Float
        quantity: Int
        mainImage: String
        images: [String!]
        description: String
        targetAudience: [String!]
        relatedProducts: [String!]
    }

    type SingleProduct {
        id: String!
        storeId: String!
        productName: String!
        price: Float!
        weight: Float!
        quantity: Int!
        mainImage: String!
        images: [String!]!
        description: String!
        relatedProducts: [String]!
        targetAudience: [String!]!
        createdAt: DateTime
        updatedAt: DateTime
    }

    type ProductResponse {
        id: String!
        storeId: String
        productName: String
        price: Float
        weight: Float
        quantity: Int
        mainImage: String
        images: [String!]
        description: String
        targetAudience: [String!]
        related: [SingleProduct!]
        createdAt: DateTime
        updatedAt: DateTime
    }

    type ProductsResponse {
        currentpage: Int!
        totalpages: Int!
        totalproducts: Int!
        limit: Int!
        products: [ProductResponse]
    }
`;