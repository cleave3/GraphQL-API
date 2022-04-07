import { gql } from "apollo-server-express";

export default gql`
    type Region {
        id: String!
        storeId: String!
        region: String!
        deliveryFee: Int!
        status: String!
        createdAt: DateTime
        updatedAt: DateTime
    }

    extend type Query {
        getRegions(storeId: String!, status: String): [RegionResponse]
        getRegion(regionId: String!): RegionResponse
      }
      
      extend type Mutation {
        addRegion(input: RegionInput!): RegionResponse!
        updateRegion(input: RegionUpdateInput!): RegionResponse!
      }

    input RegionInput {
        storeId: String!
        region: String!
        deliveryFee: Int!
    }

    input RegionUpdateInput {
        regionId: String!
        deliveryFee: Int
        status: String
    }

    type RegionResponse {
        id: String!
        storeId: String!
        region: String!
        deliveryFee: Int!
        status: String!
    }
`;