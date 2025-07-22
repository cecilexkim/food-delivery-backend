// resolvers.ts
//import { Resolvers } from './generated/graphql';

import { getVendors, getVendorById, searchVendors, createReview } from '../service';
import { getMenuCategories, getMenuItems, getMenuItemById, toggleFavorite } from './service/menu';
import { createOrder, getOrders, getOrderById, cancelOrder } from './service/order';
import { getPaymentMethods, createPaymentIntent } from './service/payment';

interface VendorArgs {
  page?: number;
  limit?: number;
  cuisine?: string;
  location?: string;
  radius?: number;
}

const resolvers: Resolvers = {
  Query: {
    vendors: (_, { page, limit, cuisine, location, radius }: VendorArgs) =>
      getVendors({ page, limit, cuisine, location, radius }),

    vendor: (_, { d }) => getVendorById(id),

    searchVendors: (_, { query, location }) => searchVendors(query, location),

    menuCategories: (_, { vendorId }) => getMenuCategories(vendorId),

    menuItems: (_, { vendorId, category }) => getMenuItems(vendorId, category),

    menuItem: (_, { id }) => getMenuItemById(id),
  },

  Mutation: {
    createReview: (_, { input }, { user }) => {
      if (!user) throw new Error('Authentication required');
      return createReview(user.id, input);
    },
  },

  Subscription: {},

  Vendor: {
    openingHours: (parent) => getOpeningHours(parent.id),
    menuCategories: (parent) => getMenuCategories(parent.id),
  },
};

export default resolvers;
