// src/features/vendors/services/vendor.service.ts
import { Injectable } from '@nestjs/common'; // Or your DI system
import VendorModel, { IVendor } from '../models/vendor.model';
import {
  CreateVendorInput,
  UpdateVendorInput,
  NearbyVendorsInput,
  SearchVendorsInput,
} from '../graphql/schemas/inputs';
import { PaginationInput } from '../../../core/graphql/schema.graphql;
import { ServiceError } from '../../../core/errors/service.error';

@Injectable()
export class VendorService {
  async createVendor(input: CreateVendorInput): Promise<IVendor> {
    try {
      const vendor = new VendorModel({
        ...input,
        location: {
          type: 'Point',
          coordinates: [input.location.lng, input.location.lat],
        },
      });
      return await vendor.save();
    } catch (error) {
      throw new ServiceError('Failed to create vendor', error);
    }
  }

  async updateVendor(id: string, input: UpdateVendorInput): Promise<IVendor> {
    try {
      const updateData: any = { ...input };
      
      if (input.location) {
        updateData.location = {
          type: 'Point',
          coordinates: [input.location.lng, input.location.lat],
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
    input: NearbyVendorsInput,
    pagination: PaginationInput
  ): Promise<{ vendors: IVendor[]; count: number }> {
    try {
      const { lat, lng, radius = 5000, cuisineType } = input;
      const { page = 1, limit = 10 } = pagination;

      const query: any = {
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
            $maxDistance: radius,
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
      const { query, location, radius = 5000 } = input;

      const searchQuery: any = {
        $text: { $search: query },
        isActive: true,
      };

      if (location) {
        searchQuery.location = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [location.lng, location.lat],
            },
            $maxDistance: radius,
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