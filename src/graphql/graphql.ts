import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  JSONObject: any;
};

export type AddBulkInput = {
  cartdata: Array<CartInput>;
};

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['String'];
  storeId: Scalars['String'];
  customerId: Scalars['String'];
  quantity: Scalars['Int'];
  productId: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CartInput = {
  storeId: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
};

export type CartResponse = {
  __typename?: 'CartResponse';
  id: Scalars['String'];
  storeId: Scalars['String'];
  customerId: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CartsResponse = {
  __typename?: 'CartsResponse';
  id: Scalars['Int'];
  storeId: Scalars['String'];
  storename: Scalars['String'];
  customerId: Scalars['String'];
  productsInCart: Scalars['Int'];
};

export type ClearCartresponse = {
  __typename?: 'ClearCartresponse';
  message: Scalars['String'];
};


export type InitOrderInput = {
  storeId: Scalars['String'];
  regionId: Scalars['String'];
};



export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addItem: CartResponse;
  addProduct?: Maybe<SingleProduct>;
  addRegion: RegionResponse;
  bulkAdd: Array<Maybe<CartResponse>>;
  clearCart: ClearCartresponse;
  completeOrder: Order;
  deleteStore?: Maybe<Store>;
  initiateOrder: OrderTotalResponse;
  registerStore?: Maybe<Store>;
  removeItem: CartResponse;
  removeOrder: Orders;
  removeProduct?: Maybe<SingleProduct>;
  updateItem: CartResponse;
  updateOrder: Order;
  updateProduct?: Maybe<SingleProduct>;
  updateRegion: RegionResponse;
  updateStore?: Maybe<Store>;
};


export type MutationAddItemArgs = {
  input: CartInput;
};


export type MutationAddProductArgs = {
  input: ProductInput;
};


export type MutationAddRegionArgs = {
  input: RegionInput;
};


export type MutationBulkAddArgs = {
  input: AddBulkInput;
};


export type MutationClearCartArgs = {
  storeId?: Maybe<Scalars['String']>;
};


export type MutationCompleteOrderArgs = {
  input: OrderInput;
};


export type MutationDeleteStoreArgs = {
  storeId: Scalars['String'];
};


export type MutationInitiateOrderArgs = {
  input: InitOrderInput;
};


export type MutationRegisterStoreArgs = {
  input: StoreInput;
};


export type MutationRemoveItemArgs = {
  cartId: Scalars['String'];
};


export type MutationRemoveOrderArgs = {
  orderId: Scalars['String'];
};


export type MutationRemoveProductArgs = {
  productId: Scalars['String'];
};


export type MutationUpdateItemArgs = {
  cartId: Scalars['String'];
  quantity: Scalars['Int'];
};


export type MutationUpdateOrderArgs = {
  input?: Maybe<OrderUpdateInput>;
};


export type MutationUpdateProductArgs = {
  input: ProductUpdateInput;
};


export type MutationUpdateRegionArgs = {
  input: RegionUpdateInput;
};


export type MutationUpdateStoreArgs = {
  input: StoreUpdateInput;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['String'];
  storeId: Scalars['String'];
  customerId: Scalars['String'];
  customerName: Scalars['String'];
  regionId: Scalars['String'];
  deliveryAddress: Scalars['String'];
  email: Scalars['String'];
  telephone: Scalars['String'];
  vat: Scalars['Int'];
  deliveryFee: Scalars['Int'];
  totalAmount: Scalars['Int'];
  status: Scalars['String'];
  deliveryStatus: Scalars['String'];
  orderDetails?: Maybe<Array<Maybe<OrderDetails>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrderDetails = {
  __typename?: 'OrderDetails';
  quantity: Scalars['Int'];
  product?: Maybe<Product>;
};

export type OrderInput = {
  storeId: Scalars['String'];
  regionId: Scalars['String'];
  telephone: Scalars['String'];
  customerName: Scalars['String'];
  email: Scalars['String'];
  deliveryAddress: Scalars['String'];
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  id: Scalars['String'];
  storeId: Scalars['String'];
  customerId: Scalars['String'];
  customerName: Scalars['String'];
  regionId: Scalars['String'];
  region: Region;
  deliveryAddress: Scalars['String'];
  email: Scalars['String'];
  telephone: Scalars['String'];
  vat: Scalars['Int'];
  deliveryFee: Scalars['Int'];
  totalAmount: Scalars['Int'];
  status: Scalars['String'];
  deliveryStatus: Scalars['String'];
  orderDetails: Array<OrderDetails>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrderTotalResponse = {
  __typename?: 'OrderTotalResponse';
  itemsCost: Scalars['Int'];
  vat: Scalars['Int'];
  deliveryFee: Scalars['Int'];
  totalAmount: Scalars['Int'];
};

export type OrderUpdateInput = {
  orderId: Scalars['String'];
  deliveryStatus?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Orders = {
  __typename?: 'Orders';
  id: Scalars['String'];
  storeId: Scalars['String'];
  customerId: Scalars['String'];
  customerName: Scalars['String'];
  regionId: Scalars['String'];
  deliveryAddress: Scalars['String'];
  email: Scalars['String'];
  telephone: Scalars['String'];
  vat: Scalars['Int'];
  deliveryFee: Scalars['Int'];
  totalAmount: Scalars['Int'];
  status: Scalars['String'];
  deliveryStatus: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrdersResponse = {
  __typename?: 'OrdersResponse';
  currentpage: Scalars['Int'];
  totalpages: Scalars['Int'];
  totalorders: Scalars['Int'];
  limit: Scalars['Int'];
  orders?: Maybe<Array<Maybe<Orders>>>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['String'];
  storeId: Scalars['String'];
  productName: Scalars['String'];
  price: Scalars['Float'];
  weight: Scalars['Float'];
  quantity: Scalars['Int'];
  mainImage: Scalars['String'];
  images: Array<Scalars['String']>;
  description: Scalars['String'];
  targetAudience: Array<Scalars['String']>;
  relatedProducts: Array<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductInput = {
  storeId: Scalars['String'];
  productName: Scalars['String'];
  price: Scalars['Float'];
  weight: Scalars['Float'];
  quantity: Scalars['Int'];
  mainImage: Scalars['String'];
  images: Array<Scalars['String']>;
  description: Scalars['String'];
  targetAudience: Array<Scalars['String']>;
  relatedProducts?: Maybe<Array<Scalars['String']>>;
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  id: Scalars['String'];
  storeId?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Int']>;
  mainImage?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
  targetAudience?: Maybe<Array<Scalars['String']>>;
  related?: Maybe<Array<SingleProduct>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductUpdateInput = {
  productId: Scalars['String'];
  productName?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Int']>;
  mainImage?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
  targetAudience?: Maybe<Array<Scalars['String']>>;
  relatedProducts?: Maybe<Array<Scalars['String']>>;
};

export type ProductsResponse = {
  __typename?: 'ProductsResponse';
  currentpage: Scalars['Int'];
  totalpages: Scalars['Int'];
  totalproducts: Scalars['Int'];
  limit: Scalars['Int'];
  products?: Maybe<Array<Maybe<ProductResponse>>>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  getOrder?: Maybe<OrderResponse>;
  getOrders?: Maybe<OrdersResponse>;
  getProduct?: Maybe<ProductResponse>;
  getProducts: ProductsResponse;
  getRegion?: Maybe<RegionResponse>;
  getRegions?: Maybe<Array<Maybe<RegionResponse>>>;
  getStore?: Maybe<StoreResponse>;
  getStores?: Maybe<StoresResponse>;
  getcart?: Maybe<Array<Maybe<StoreCartResponse>>>;
  getcarts?: Maybe<Array<Maybe<CartsResponse>>>;
  ownerStore?: Maybe<StoreResponse>;
  searchProduct: ProductsResponse;
  searchStores: Array<Store>;
};


export type QueryGetOrderArgs = {
  orderId: Scalars['String'];
};


export type QueryGetOrdersArgs = {
  customerId?: Maybe<Scalars['String']>;
  storeId?: Maybe<Scalars['String']>;
  pageno?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryGetProductArgs = {
  productId: Scalars['String'];
};


export type QueryGetProductsArgs = {
  storeId: Scalars['String'];
  targetAudience?: Maybe<Array<Scalars['String']>>;
  pageno?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryGetRegionArgs = {
  regionId: Scalars['String'];
};


export type QueryGetRegionsArgs = {
  storeId: Scalars['String'];
  status?: Maybe<Scalars['String']>;
};


export type QueryGetStoreArgs = {
  storeId: Scalars['String'];
};


export type QueryGetStoresArgs = {
  category?: Maybe<Scalars['String']>;
  pageno?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryGetcartArgs = {
  storeId?: Maybe<Scalars['String']>;
};


export type QuerySearchProductArgs = {
  searchterm: Scalars['String'];
  storeId?: Maybe<Scalars['String']>;
  targetAudience?: Maybe<Array<Scalars['String']>>;
  pageno?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySearchStoresArgs = {
  searchterm: Scalars['String'];
};

export type Region = {
  __typename?: 'Region';
  id: Scalars['String'];
  storeId: Scalars['String'];
  region: Scalars['String'];
  deliveryFee: Scalars['Int'];
  status: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RegionInput = {
  storeId: Scalars['String'];
  region: Scalars['String'];
  deliveryFee: Scalars['Int'];
};

export type RegionResponse = {
  __typename?: 'RegionResponse';
  id: Scalars['String'];
  storeId: Scalars['String'];
  region: Scalars['String'];
  deliveryFee: Scalars['Int'];
  status: Scalars['String'];
};

export type RegionUpdateInput = {
  regionId: Scalars['String'];
  deliveryFee?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
};

export type SingleProduct = {
  __typename?: 'SingleProduct';
  id: Scalars['String'];
  storeId: Scalars['String'];
  productName: Scalars['String'];
  price: Scalars['Float'];
  weight: Scalars['Float'];
  quantity: Scalars['Int'];
  mainImage: Scalars['String'];
  images: Array<Scalars['String']>;
  description: Scalars['String'];
  relatedProducts: Array<Maybe<Scalars['String']>>;
  targetAudience: Array<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Store = {
  __typename?: 'Store';
  id: Scalars['String'];
  owner: Scalars['String'];
  storeName: Scalars['String'];
  phone_1: Scalars['String'];
  phone_2?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  category: Scalars['String'];
  description: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type StoreCartResponse = {
  __typename?: 'StoreCartResponse';
  id: Scalars['String'];
  storeId: Scalars['String'];
  customerId: Scalars['String'];
  quantity: Scalars['Int'];
  product: Product;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type StoreInput = {
  storeName: Scalars['String'];
  phone_1: Scalars['String'];
  phone_2?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  category: Scalars['String'];
  description: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
};

export type StoreResponse = {
  __typename?: 'StoreResponse';
  store?: Maybe<Store>;
  supportedRegions: Array<Region>;
};

export type StoreUpdateInput = {
  storeId: Scalars['String'];
  storeName?: Maybe<Scalars['String']>;
  phone_1?: Maybe<Scalars['String']>;
  phone_2?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
};

export type StoresResponse = {
  __typename?: 'StoresResponse';
  currentpage: Scalars['Int'];
  totalpages: Scalars['Int'];
  totalstores: Scalars['Int'];
  limit: Scalars['Int'];
  stores?: Maybe<Array<Maybe<Store>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddBulkInput: AddBulkInput;
  Cart: ResolverTypeWrapper<Cart>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CartInput: CartInput;
  CartResponse: ResolverTypeWrapper<CartResponse>;
  CartsResponse: ResolverTypeWrapper<CartsResponse>;
  ClearCartresponse: ResolverTypeWrapper<ClearCartresponse>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  InitOrderInput: InitOrderInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderDetails: ResolverTypeWrapper<OrderDetails>;
  OrderInput: OrderInput;
  OrderResponse: ResolverTypeWrapper<OrderResponse>;
  OrderTotalResponse: ResolverTypeWrapper<OrderTotalResponse>;
  OrderUpdateInput: OrderUpdateInput;
  Orders: ResolverTypeWrapper<Orders>;
  OrdersResponse: ResolverTypeWrapper<OrdersResponse>;
  Product: ResolverTypeWrapper<Product>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ProductInput: ProductInput;
  ProductResponse: ResolverTypeWrapper<ProductResponse>;
  ProductUpdateInput: ProductUpdateInput;
  ProductsResponse: ResolverTypeWrapper<ProductsResponse>;
  Query: ResolverTypeWrapper<{}>;
  Region: ResolverTypeWrapper<Region>;
  RegionInput: RegionInput;
  RegionResponse: ResolverTypeWrapper<RegionResponse>;
  RegionUpdateInput: RegionUpdateInput;
  SingleProduct: ResolverTypeWrapper<SingleProduct>;
  Store: ResolverTypeWrapper<Store>;
  StoreCartResponse: ResolverTypeWrapper<StoreCartResponse>;
  StoreInput: StoreInput;
  StoreResponse: ResolverTypeWrapper<StoreResponse>;
  StoreUpdateInput: StoreUpdateInput;
  StoresResponse: ResolverTypeWrapper<StoresResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddBulkInput: AddBulkInput;
  Cart: Cart;
  String: Scalars['String'];
  Int: Scalars['Int'];
  CartInput: CartInput;
  CartResponse: CartResponse;
  CartsResponse: CartsResponse;
  ClearCartresponse: ClearCartresponse;
  DateTime: Scalars['DateTime'];
  InitOrderInput: InitOrderInput;
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Mutation: {};
  Order: Order;
  OrderDetails: OrderDetails;
  OrderInput: OrderInput;
  OrderResponse: OrderResponse;
  OrderTotalResponse: OrderTotalResponse;
  OrderUpdateInput: OrderUpdateInput;
  Orders: Orders;
  OrdersResponse: OrdersResponse;
  Product: Product;
  Float: Scalars['Float'];
  ProductInput: ProductInput;
  ProductResponse: ProductResponse;
  ProductUpdateInput: ProductUpdateInput;
  ProductsResponse: ProductsResponse;
  Query: {};
  Region: Region;
  RegionInput: RegionInput;
  RegionResponse: RegionResponse;
  RegionUpdateInput: RegionUpdateInput;
  SingleProduct: SingleProduct;
  Store: Store;
  StoreCartResponse: StoreCartResponse;
  StoreInput: StoreInput;
  StoreResponse: StoreResponse;
  StoreUpdateInput: StoreUpdateInput;
  StoresResponse: StoresResponse;
  Boolean: Scalars['Boolean'];
};

export type CartResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CartResponse'] = ResolversParentTypes['CartResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  productId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CartsResponse'] = ResolversParentTypes['CartsResponse']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  storeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productsInCart?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClearCartresponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClearCartresponse'] = ResolversParentTypes['ClearCartresponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addItem?: Resolver<ResolversTypes['CartResponse'], ParentType, ContextType, RequireFields<MutationAddItemArgs, 'input'>>;
  addProduct?: Resolver<Maybe<ResolversTypes['SingleProduct']>, ParentType, ContextType, RequireFields<MutationAddProductArgs, 'input'>>;
  addRegion?: Resolver<ResolversTypes['RegionResponse'], ParentType, ContextType, RequireFields<MutationAddRegionArgs, 'input'>>;
  bulkAdd?: Resolver<Array<Maybe<ResolversTypes['CartResponse']>>, ParentType, ContextType, RequireFields<MutationBulkAddArgs, 'input'>>;
  clearCart?: Resolver<ResolversTypes['ClearCartresponse'], ParentType, ContextType, RequireFields<MutationClearCartArgs, never>>;
  completeOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationCompleteOrderArgs, 'input'>>;
  deleteStore?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<MutationDeleteStoreArgs, 'storeId'>>;
  initiateOrder?: Resolver<ResolversTypes['OrderTotalResponse'], ParentType, ContextType, RequireFields<MutationInitiateOrderArgs, 'input'>>;
  registerStore?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<MutationRegisterStoreArgs, 'input'>>;
  removeItem?: Resolver<ResolversTypes['CartResponse'], ParentType, ContextType, RequireFields<MutationRemoveItemArgs, 'cartId'>>;
  removeOrder?: Resolver<ResolversTypes['Orders'], ParentType, ContextType, RequireFields<MutationRemoveOrderArgs, 'orderId'>>;
  removeProduct?: Resolver<Maybe<ResolversTypes['SingleProduct']>, ParentType, ContextType, RequireFields<MutationRemoveProductArgs, 'productId'>>;
  updateItem?: Resolver<ResolversTypes['CartResponse'], ParentType, ContextType, RequireFields<MutationUpdateItemArgs, 'cartId' | 'quantity'>>;
  updateOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationUpdateOrderArgs, never>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['SingleProduct']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'input'>>;
  updateRegion?: Resolver<ResolversTypes['RegionResponse'], ParentType, ContextType, RequireFields<MutationUpdateRegionArgs, 'input'>>;
  updateStore?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<MutationUpdateStoreArgs, 'input'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  regionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  telephone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vat?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  deliveryFee?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderDetails?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrderDetails']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderDetails'] = ResolversParentTypes['OrderDetails']> = {
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderResponse'] = ResolversParentTypes['OrderResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  regionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<ResolversTypes['Region'], ParentType, ContextType>;
  deliveryAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  telephone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vat?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  deliveryFee?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderDetails?: Resolver<Array<ResolversTypes['OrderDetails']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderTotalResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderTotalResponse'] = ResolversParentTypes['OrderTotalResponse']> = {
  itemsCost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  vat?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  deliveryFee?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrdersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Orders'] = ResolversParentTypes['Orders']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  regionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  telephone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vat?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  deliveryFee?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrdersResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrdersResponse'] = ResolversParentTypes['OrdersResponse']> = {
  currentpage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalpages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalorders?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Orders']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mainImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  targetAudience?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  relatedProducts?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductResponse'] = ResolversParentTypes['ProductResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  mainImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  targetAudience?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  related?: Resolver<Maybe<Array<ResolversTypes['SingleProduct']>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductsResponse'] = ResolversParentTypes['ProductsResponse']> = {
  currentpage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalpages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalproducts?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductResponse']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getOrder?: Resolver<Maybe<ResolversTypes['OrderResponse']>, ParentType, ContextType, RequireFields<QueryGetOrderArgs, 'orderId'>>;
  getOrders?: Resolver<Maybe<ResolversTypes['OrdersResponse']>, ParentType, ContextType, RequireFields<QueryGetOrdersArgs, never>>;
  getProduct?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<QueryGetProductArgs, 'productId'>>;
  getProducts?: Resolver<ResolversTypes['ProductsResponse'], ParentType, ContextType, RequireFields<QueryGetProductsArgs, 'storeId'>>;
  getRegion?: Resolver<Maybe<ResolversTypes['RegionResponse']>, ParentType, ContextType, RequireFields<QueryGetRegionArgs, 'regionId'>>;
  getRegions?: Resolver<Maybe<Array<Maybe<ResolversTypes['RegionResponse']>>>, ParentType, ContextType, RequireFields<QueryGetRegionsArgs, 'storeId'>>;
  getStore?: Resolver<Maybe<ResolversTypes['StoreResponse']>, ParentType, ContextType, RequireFields<QueryGetStoreArgs, 'storeId'>>;
  getStores?: Resolver<Maybe<ResolversTypes['StoresResponse']>, ParentType, ContextType, RequireFields<QueryGetStoresArgs, never>>;
  getcart?: Resolver<Maybe<Array<Maybe<ResolversTypes['StoreCartResponse']>>>, ParentType, ContextType, RequireFields<QueryGetcartArgs, never>>;
  getcarts?: Resolver<Maybe<Array<Maybe<ResolversTypes['CartsResponse']>>>, ParentType, ContextType>;
  ownerStore?: Resolver<Maybe<ResolversTypes['StoreResponse']>, ParentType, ContextType>;
  searchProduct?: Resolver<ResolversTypes['ProductsResponse'], ParentType, ContextType, RequireFields<QuerySearchProductArgs, 'searchterm'>>;
  searchStores?: Resolver<Array<ResolversTypes['Store']>, ParentType, ContextType, RequireFields<QuerySearchStoresArgs, 'searchterm'>>;
};

export type RegionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Region'] = ResolversParentTypes['Region']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryFee?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegionResponse'] = ResolversParentTypes['RegionResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryFee?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SingleProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['SingleProduct'] = ResolversParentTypes['SingleProduct']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  mainImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  relatedProducts?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  targetAudience?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Store'] = ResolversParentTypes['Store']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone_1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone_2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreCartResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StoreCartResponse'] = ResolversParentTypes['StoreCartResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  storeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoreResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StoreResponse'] = ResolversParentTypes['StoreResponse']> = {
  store?: Resolver<Maybe<ResolversTypes['Store']>, ParentType, ContextType>;
  supportedRegions?: Resolver<Array<ResolversTypes['Region']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoresResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StoresResponse'] = ResolversParentTypes['StoresResponse']> = {
  currentpage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalpages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalstores?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stores?: Resolver<Maybe<Array<Maybe<ResolversTypes['Store']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Cart?: CartResolvers<ContextType>;
  CartResponse?: CartResponseResolvers<ContextType>;
  CartsResponse?: CartsResponseResolvers<ContextType>;
  ClearCartresponse?: ClearCartresponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderDetails?: OrderDetailsResolvers<ContextType>;
  OrderResponse?: OrderResponseResolvers<ContextType>;
  OrderTotalResponse?: OrderTotalResponseResolvers<ContextType>;
  Orders?: OrdersResolvers<ContextType>;
  OrdersResponse?: OrdersResponseResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductResponse?: ProductResponseResolvers<ContextType>;
  ProductsResponse?: ProductsResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Region?: RegionResolvers<ContextType>;
  RegionResponse?: RegionResponseResolvers<ContextType>;
  SingleProduct?: SingleProductResolvers<ContextType>;
  Store?: StoreResolvers<ContextType>;
  StoreCartResponse?: StoreCartResponseResolvers<ContextType>;
  StoreResponse?: StoreResponseResolvers<ContextType>;
  StoresResponse?: StoresResponseResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
