import { gql } from "apollo-server-express"

export default gql`
type Order {
  id: String!
  storeId: String!
  customerId: String!
  customerName: String!
  regionId: String!
  deliveryAddress: String!
  email: String!
  telephone: String!    
  vat: Int!
  deliveryFee: Int!
  totalAmount: Int!
  status: String!
  deliveryStatus: String!
  orderDetails: [OrderDetails]
  createdAt: DateTime
  updatedAt: DateTime
}

type OrderDetails {
    quantity: Int!
    product: Product
}

extend type Query {
  getOrders(customerId: String, storeId: String, pageno: Int, limit: Int): OrdersResponse
  getOrder(orderId: String!): OrderResponse
}

extend type Mutation {
  initiateOrder(input: InitOrderInput!): OrderTotalResponse!
  completeOrder(input: OrderInput!): Order!
  updateOrder(input: OrderUpdateInput): Order!
  removeOrder(orderId: String!): Orders!
}

input OrderInput {
    storeId: String!
    regionId: String!
    telephone: String!
    customerName: String!
    email: String!
    deliveryAddress: String!
}

input InitOrderInput {
    storeId: String!
    regionId: String!
}

input OrderUpdateInput {
    orderId: String!
    deliveryStatus: String
    status: String
}

type OrderTotalResponse {
    itemsCost: Int!
    vat: Int!
    deliveryFee: Int!
    totalAmount: Int!
}

type OrderResponse {
    id: String!
    storeId: String!
    customerId: String!
    customerName: String!
    regionId: String!
    region: Region!
    deliveryAddress: String!
    email: String!
    telephone: String! 
    vat: Int!
    deliveryFee: Int!
    totalAmount: Int!
    status: String!
    deliveryStatus: String!
    orderDetails: [OrderDetails!]!
    createdAt: DateTime
    updatedAt: DateTime
}

type Orders {
    id: String!
    storeId: String!
    customerId: String!
    customerName: String!
    regionId: String!
    deliveryAddress: String!
    email: String!
    telephone: String! 
    vat: Int!
    deliveryFee: Int!
    totalAmount: Int!
    status: String!
    deliveryStatus: String!
    createdAt: DateTime
    updatedAt: DateTime
}

type OrdersResponse {
    currentpage: Int!
    totalpages: Int!
    totalorders: Int!
    limit: Int!
    orders: [Orders]
}
`;