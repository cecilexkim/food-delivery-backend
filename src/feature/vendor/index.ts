// feature model exports
import { VendorResolver } from './graphql/resolvers';
import { Resolvers } from './graphql/schema';
import VendorService from './services/vendor.service';
import VendorModel from './models/vendor.model';

export default {
  // GraphQL
  resolvers: VendorResolver,
  schema: vendorSchema,

  // Services
  services: {
    vendorService: VendorService,
  },

  // Models
  models: {
    Vendor: VendorModel,
  },

  // REST Controllers
  controllers: [], // if using REST

  // Constants/Types
  ...require('./constants'),
  ...require('./types'),
};
