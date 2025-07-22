import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  location: GeoPoint;
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  title: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type AddressInput = {
  address: Scalars['String']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  location: GeoPointInput;
  title: Scalars['String']['input'];
};

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export enum DeliveryStatus {
  Delivered = 'DELIVERED',
  InTransit = 'IN_TRANSIT',
  Nearby = 'NEARBY',
  PickedUp = 'PICKED_UP'
}

export type DeliveryUpdate = {
  __typename?: 'DeliveryUpdate';
  estimatedArrival?: Maybe<Scalars['String']['output']>;
  location: GeoPoint;
  status: DeliveryStatus;
};

export type Driver = {
  __typename?: 'Driver';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type GeoPoint = {
  __typename?: 'GeoPoint';
  latitudeDegrees: Scalars['Float']['output'];
  longitudeDegrees: Scalars['Float']['output'];
};

export type GeoPointInput = {
  latitudeDegrees: Scalars['Float']['input'];
  longitudeDegrees: Scalars['Float']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MenuCategory = {
  __typename?: 'MenuCategory';
  items: Array<MenuItem>;
  name: MenuCategoryName;
};

export enum MenuCategoryName {
  AlcoholicDrinks = 'ALCOHOLIC_DRINKS',
  Appetizers = 'APPETIZERS',
  Breakfast = 'BREAKFAST',
  Brunch = 'BRUNCH',
  Burgers = 'BURGERS',
  Desserts = 'DESSERTS',
  Dinner = 'DINNER',
  Drinks = 'DRINKS',
  Entrees = 'ENTREES',
  KidsMenu = 'KIDS_MENU',
  Lunch = 'LUNCH',
  Pastas = 'PASTAS',
  Pizzas = 'PIZZAS',
  Salads = 'SALADS',
  Sandwiches = 'SANDWICHES',
  Seafood = 'SEAFOOD',
  Snacks = 'SNACKS',
  Soups = 'SOUPS',
  Vegan = 'VEGAN',
  Vegetarian = 'VEGETARIAN'
}

export type MenuItem = {
  __typename?: 'MenuItem';
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isAvailable: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  options?: Maybe<Array<MenuItemOption>>;
  price: Scalars['Float']['output'];
};

export type MenuItemOption = {
  __typename?: 'MenuItemOption';
  choices: Array<MenuItemOptionChoice>;
  name: Scalars['String']['output'];
};

export type MenuItemOptionChoice = {
  __typename?: 'MenuItemOptionChoice';
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAddress: Vendor;
  removeAddress: Vendor;
  updateAddress: Vendor;
};


export type MutationAddAddressArgs = {
  input: AddressInput;
};


export type MutationRemoveAddressArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAddressArgs = {
  id: Scalars['ID']['input'];
  input: AddressInput;
};

export type OpeningHours = {
  __typename?: 'OpeningHours';
  close: Scalars['String']['output'];
  day: DayOfWeek;
  open: Scalars['String']['output'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['String']['output'];
  deliveredAt?: Maybe<Scalars['String']['output']>;
  deliveryAddress: Address;
  deliveryFee: Scalars['Float']['output'];
  driver?: Maybe<Driver>;
  estimatedDelivery?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  paymentMethod: Scalars['String']['output'];
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  subtotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  user: User;
  vendor: Vendor;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  item: MenuItem;
  options?: Maybe<Array<OrderItemOption>>;
  price: Scalars['Float']['output'];
  quantity: Scalars['Int']['output'];
  specialInstructions?: Maybe<Scalars['String']['output']>;
};

export type OrderItemOption = {
  __typename?: 'OrderItemOption';
  choice: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  OnTheWay = 'ON_THE_WAY',
  Preparing = 'PREPARING'
}

export type Pagination = {
  __typename?: 'Pagination';
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationInput = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type PaymentIntent = {
  __typename?: 'PaymentIntent';
  clientSecret: Scalars['String']['output'];
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  brand?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  last4?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export enum PaymentStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING'
}

export type Query = {
  __typename?: 'Query';
  menuCategories: Array<MenuCategory>;
  menuItem?: Maybe<MenuItem>;
  menuItems: Array<MenuItem>;
  searchVendors: Array<Vendor>;
  vendor?: Maybe<Vendor>;
  vendors: VendorPaginatedResponse;
};


export type QueryMenuCategoriesArgs = {
  vendorId: Scalars['ID']['input'];
};


export type QueryMenuItemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMenuItemsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  vendorId: Scalars['ID']['input'];
};


export type QuerySearchVendorsArgs = {
  location?: InputMaybe<GeoPointInput>;
  query: Scalars['String']['input'];
};


export type QueryVendorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVendorsArgs = {
  cuisine?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<GeoPointInput>;
  page?: InputMaybe<Scalars['Int']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type Review = {
  __typename?: 'Review';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  user: User;
};

export type User = {
  __typename?: 'User';
  addresses: Array<Address>;
  avatar?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  favorites: Array<MenuItem>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type Vendor = {
  __typename?: 'Vendor';
  address: Address;
  coverImage: Scalars['String']['output'];
  cuisineType: Scalars['String']['output'];
  deliveryFee: Scalars['Float']['output'];
  deliveryTime: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: GeoPoint;
  logo: Scalars['String']['output'];
  menuCategories: Array<MenuCategory>;
  minOrder: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  openingHours: Array<OpeningHours>;
  rating: Scalars['Float']['output'];
  reviewCount: Scalars['Int']['output'];
};

export type VendorPaginatedResponse = {
  __typename?: 'VendorPaginatedResponse';
  data: Array<Vendor>;
  pagination: Pagination;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DayOfWeek: DayOfWeek;
  DeliveryStatus: DeliveryStatus;
  DeliveryUpdate: ResolverTypeWrapper<DeliveryUpdate>;
  Driver: ResolverTypeWrapper<Driver>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GeoPoint: ResolverTypeWrapper<GeoPoint>;
  GeoPointInput: GeoPointInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  MenuCategory: ResolverTypeWrapper<MenuCategory>;
  MenuCategoryName: MenuCategoryName;
  MenuItem: ResolverTypeWrapper<MenuItem>;
  MenuItemOption: ResolverTypeWrapper<MenuItemOption>;
  MenuItemOptionChoice: ResolverTypeWrapper<MenuItemOptionChoice>;
  Mutation: ResolverTypeWrapper<{}>;
  OpeningHours: ResolverTypeWrapper<OpeningHours>;
  Order: ResolverTypeWrapper<Order>;
  OrderItem: ResolverTypeWrapper<OrderItem>;
  OrderItemOption: ResolverTypeWrapper<OrderItemOption>;
  OrderStatus: OrderStatus;
  Pagination: ResolverTypeWrapper<Pagination>;
  PaginationInput: PaginationInput;
  PaymentIntent: ResolverTypeWrapper<PaymentIntent>;
  PaymentMethod: ResolverTypeWrapper<PaymentMethod>;
  PaymentStatus: PaymentStatus;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Review: ResolverTypeWrapper<Review>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  Vendor: ResolverTypeWrapper<Vendor>;
  VendorPaginatedResponse: ResolverTypeWrapper<VendorPaginatedResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  AddressInput: AddressInput;
  Boolean: Scalars['Boolean']['output'];
  DeliveryUpdate: DeliveryUpdate;
  Driver: Driver;
  Float: Scalars['Float']['output'];
  GeoPoint: GeoPoint;
  GeoPointInput: GeoPointInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  MenuCategory: MenuCategory;
  MenuItem: MenuItem;
  MenuItemOption: MenuItemOption;
  MenuItemOptionChoice: MenuItemOptionChoice;
  Mutation: {};
  OpeningHours: OpeningHours;
  Order: Order;
  OrderItem: OrderItem;
  OrderItemOption: OrderItemOption;
  Pagination: Pagination;
  PaginationInput: PaginationInput;
  PaymentIntent: PaymentIntent;
  PaymentMethod: PaymentMethod;
  Query: {};
  RegisterInput: RegisterInput;
  Review: Review;
  String: Scalars['String']['output'];
  User: User;
  Vendor: Vendor;
  VendorPaginatedResponse: VendorPaginatedResponse;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isDefault?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['GeoPoint'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zipCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeliveryUpdateResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeliveryUpdate'] = ResolversParentTypes['DeliveryUpdate']> = {
  estimatedArrival?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['GeoPoint'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['DeliveryStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DriverResolvers<ContextType = any, ParentType extends ResolversParentTypes['Driver'] = ResolversParentTypes['Driver']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoPointResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoPoint'] = ResolversParentTypes['GeoPoint']> = {
  latitudeDegrees?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitudeDegrees?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuCategory'] = ResolversParentTypes['MenuCategory']> = {
  items?: Resolver<Array<ResolversTypes['MenuItem']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['MenuCategoryName'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItem'] = ResolversParentTypes['MenuItem']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  options?: Resolver<Maybe<Array<ResolversTypes['MenuItemOption']>>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemOptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItemOption'] = ResolversParentTypes['MenuItemOption']> = {
  choices?: Resolver<Array<ResolversTypes['MenuItemOptionChoice']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuItemOptionChoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['MenuItemOptionChoice'] = ResolversParentTypes['MenuItemOptionChoice']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAddress?: Resolver<ResolversTypes['Vendor'], ParentType, ContextType, RequireFields<MutationAddAddressArgs, 'input'>>;
  removeAddress?: Resolver<ResolversTypes['Vendor'], ParentType, ContextType, RequireFields<MutationRemoveAddressArgs, 'id'>>;
  updateAddress?: Resolver<ResolversTypes['Vendor'], ParentType, ContextType, RequireFields<MutationUpdateAddressArgs, 'id' | 'input'>>;
};

export type OpeningHoursResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpeningHours'] = ResolversParentTypes['OpeningHours']> = {
  close?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  day?: Resolver<ResolversTypes['DayOfWeek'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveredAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deliveryAddress?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  deliveryFee?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  driver?: Resolver<Maybe<ResolversTypes['Driver']>, ParentType, ContextType>;
  estimatedDelivery?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['OrderItem']>, ParentType, ContextType>;
  paymentMethod?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentStatus?: Resolver<ResolversTypes['PaymentStatus'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  subtotal?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  tax?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  vendor?: Resolver<ResolversTypes['Vendor'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = {
  item?: Resolver<ResolversTypes['MenuItem'], ParentType, ContextType>;
  options?: Resolver<Maybe<Array<ResolversTypes['OrderItemOption']>>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  specialInstructions?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderItemOptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderItemOption'] = ResolversParentTypes['OrderItemOption']> = {
  choice?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = {
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentIntentResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentIntent'] = ResolversParentTypes['PaymentIntent']> = {
  clientSecret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentMethodResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentMethod'] = ResolversParentTypes['PaymentMethod']> = {
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  last4?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  menuCategories?: Resolver<Array<ResolversTypes['MenuCategory']>, ParentType, ContextType, RequireFields<QueryMenuCategoriesArgs, 'vendorId'>>;
  menuItem?: Resolver<Maybe<ResolversTypes['MenuItem']>, ParentType, ContextType, RequireFields<QueryMenuItemArgs, 'id'>>;
  menuItems?: Resolver<Array<ResolversTypes['MenuItem']>, ParentType, ContextType, RequireFields<QueryMenuItemsArgs, 'vendorId'>>;
  searchVendors?: Resolver<Array<ResolversTypes['Vendor']>, ParentType, ContextType, RequireFields<QuerySearchVendorsArgs, 'query'>>;
  vendor?: Resolver<Maybe<ResolversTypes['Vendor']>, ParentType, ContextType, RequireFields<QueryVendorArgs, 'id'>>;
  vendors?: Resolver<ResolversTypes['VendorPaginatedResponse'], ParentType, ContextType, RequireFields<QueryVendorsArgs, 'limit' | 'page' | 'radius'>>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  favorites?: Resolver<Array<ResolversTypes['MenuItem']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VendorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vendor'] = ResolversParentTypes['Vendor']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  coverImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cuisineType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deliveryFee?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  deliveryTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['GeoPoint'], ParentType, ContextType>;
  logo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  menuCategories?: Resolver<Array<ResolversTypes['MenuCategory']>, ParentType, ContextType>;
  minOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openingHours?: Resolver<Array<ResolversTypes['OpeningHours']>, ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  reviewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VendorPaginatedResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['VendorPaginatedResponse'] = ResolversParentTypes['VendorPaginatedResponse']> = {
  data?: Resolver<Array<ResolversTypes['Vendor']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['Pagination'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  DeliveryUpdate?: DeliveryUpdateResolvers<ContextType>;
  Driver?: DriverResolvers<ContextType>;
  GeoPoint?: GeoPointResolvers<ContextType>;
  MenuCategory?: MenuCategoryResolvers<ContextType>;
  MenuItem?: MenuItemResolvers<ContextType>;
  MenuItemOption?: MenuItemOptionResolvers<ContextType>;
  MenuItemOptionChoice?: MenuItemOptionChoiceResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OpeningHours?: OpeningHoursResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  OrderItemOption?: OrderItemOptionResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  PaymentIntent?: PaymentIntentResolvers<ContextType>;
  PaymentMethod?: PaymentMethodResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Vendor?: VendorResolvers<ContextType>;
  VendorPaginatedResponse?: VendorPaginatedResponseResolvers<ContextType>;
};

