// src/features/vendors/services/vendor.service.ts
import { Injectable } from '@nestjs/common'; // Or your DI system
import typeDefs from './graphql/schema.graphql';
import resolvers from './graphql/resolvers';
import VendorModel, { IVendor } from './VendorModel';
import ReviewModel, { IReview } from './ReviewModel';

import {
  GetNearbyVendorsInput,
  CreateVendorInput,
  UpdateVendorInput,
  SearchVendorsInput,
  PaginationInput,
} from '@generated/graphql/types';

import { ServiceError } from '@core/error';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { authDirective } from '@core/util/auth';

const schema = authDirective(makeExecutableSchema({ typeDefs, resolvers }));

@Injectable()
export class VendorService {
  async createVendor(input: CreateVendorInput): Promise<IVendor> {
    try {
      const vendor = new VendorModel({
        ...input,
        location: {
          type: 'Point',
          coordinates: [input.location.lonDeg, input.location.latDeg],
        },
      });
      return await vendor.save();
    } catch (error: unknown) {
      throw new ServiceError('Failed to create vendor', error);
    }
  }

  async updateVendor(id: string, input: UpdateVendorInput): Promise<IVendor> {
    try {
      const updateData: any = { ...input };

      if (input.location) {
        updateData.location = {
          type: 'Point',
          coordinates: [input.location.lonDeg, input.location.latDeg],
        };
      }

      const vendor = await VendorModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!vendor) {
        throw new ServiceError('Vendor not found');
      }

      return vendor;
    } catch (error) {
      throw new ServiceError('Failed to update vendor', error);
    }
  }

  async getVendorById(id: string): Promise<IVendor> {
    try {
      const vendor = await VendorModel.findById(id);
      if (!vendor) {
        throw new ServiceError('Vendor not found');
      }
      return vendor;
    } catch (error) {
      throw new ServiceError('Failed to fetch vendor', error);
    }
  }

  async getNearbyVendors(
    input: GetNearbyVendorsInput,
    pagination: PaginationInput,
  ): Promise<{ vendors: IVendor[]; count: number }> {
    try {
      const { location, radiusMeters = 5000, cuisineType } = input;
      const { page = 1, limit = 10 } = pagination;

      const query: any = {
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [location.lonDeg, location.latDeg],
            },
            $maxDistance: radiusMeters,
          },
        },
        isActive: true,
      };

      if (cuisineType) {
        query.cuisineType = cuisineType;
      }

      const [vendors, count] = await Promise.all([
        VendorModel.find(query)
          .skip((page - 1) * limit)
          .limit(limit),
        VendorModel.countDocuments(query),
      ]);

      return { vendors, count };
    } catch (error) {
      throw new ServiceError('Failed to fetch nearby vendors', error);
    }
  }

  async searchVendors(input: SearchVendorsInput): Promise<IVendor[]> {
    try {
      const { query, location, radiusMeters = 5000 } = input;

      const searchQuery: any = {
        $text: { $search: query },
        isActive: true,
      };

      if (location) {
        searchQuery.location = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [location.lonDeg, location.latDeg],
            },
            $maxDistance: radiusMeters,
          },
        };
      }

      return await VendorModel.find(searchQuery)
        .sort({ score: { $meta: 'textScore' } })
        .limit(20);
    } catch (error) {
      throw new ServiceError('Failed to search vendors', error);
    }
  }

  async getVendorsByIds(ids: string[]): Promise<IVendor[]> {
    try {
      return await VendorModel.find({ _id: { $in: ids } });
    } catch (error) {
      throw new ServiceError('Failed to fetch vendors by IDs', error);
    }
  }

  async calculateAverageRating(vendorId: string): Promise<number> {
    try {
      const result = await ReviewModel.aggregate([
        { $match: { vendorId } },
        { $group: { _id: null, averageRating: { $avg: '$rating' } } },
      ]);

      return result[0]?.averageRating || 0;
    } catch (error) {
      throw new ServiceError('Failed to calculate average rating', error);
    }
  }
}
