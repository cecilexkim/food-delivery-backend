import VendorResolver from './graphql/resolvers';
import VendorSchema from './graphql/schema.graphql';
import { VendorService } from './service';
import VendorModel from './model';

export default {
  resolvers: VendorResolver,
  schema: VendorSchema,

  services: {
    vendorService: VendorService,
  },

  models: {
    Vendor: VendorModel,
  },

  ...require('./constants'),
  ...require('./types'),
};
