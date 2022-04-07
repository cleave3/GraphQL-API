import { gql } from "apollo-server-express"

export default gql`
type Cart {
  id: String!
  storeId: String!
  customerId: String!
  quantity: Int!
  productId: String!
  createdAt: DateTime
  updatedAt: DateTime
}

extend type Query {
  getcarts: [CartsResponse]
  getcart(storeId: String): [StoreCartResponse]
}

extend type Mutation {
  addItem(input: CartInput!): CartResponse!
  bulkAdd(input: AddBulkInput!): [CartResponse]!
  updateItem(cartId: String!, quantity: Int!): CartResponse!
  removeItem(cartId: String!): CartResponse!
  clearCart(storeId: String): ClearCartresponse!
}


input CartInput {
    storeId: String!
    quantity: Int
    productId: String  
}

input AddBulkInput {
  cartdata: [CartInput!]!
}

type ClearCartresponse {
  message: String!
}

type CartResponse {
    id: String!
    storeId: String!
    customerId: String!
    quantity: Int
    productId: String
    createdAt: DateTime
    updatedAt: DateTime
}

type CartsResponse {
    id: Int!
    storeId: String!
    storename: String!
    customerId: String!
    productsInCart: Int!
}

type StoreCartResponse {
  id: String!
  storeId: String!
  customerId: String!
  quantity: Int!
  product: Product!
  createdAt: DateTime
  updatedAt: DateTime
}
`;