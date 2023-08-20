import { PipeTransform, Injectable, Logger } from '@nestjs/common';

import { validate } from 'class-validator';

import { OfferDTO } from '../dto/offer.dto';
import { Provider2Mapper } from '../mappers/provider2.mapper';
import { Provider1Mapper } from '../mappers/provider1.mapper';

@Injectable()
export class OfferValidationPipe implements PipeTransform<any> {
  private readonly logger = new Logger(OfferValidationPipe.name);

  constructor() {}

  async transform(value: any): Promise<OfferDTO | undefined> {
    const validatedData = await this.validateKeysRecursively(value);

    if (!validatedData) {
      this.logger.warn('Skipping offer due to validation error');
      return;
    }

    return validatedData.map(this.getOfferFromPartial);
  }

  private async validateKeysRecursively(obj: any): Promise<any> {
    if (typeof obj !== 'object' || obj == null) {
      return;
    }

    // Check for the keys "Offer", "offer", and "offers"
    if (!('Offer' in obj) && !('offers' in obj && Array.isArray(obj.offers))) {
      for (const key in obj) {
        const data = await this.validateKeysRecursively(obj[key]);

        if (data) {
          return data;
        }
      }
    }

    const data = this.mapByProvider(obj);
    const offer = this.getOfferFromPartial(data?.[0]);
    const validationErrors = await validate(offer);

    if (validationErrors.length > 0) {
      return;
    }

    return data;
  }

  private mapByProvider(obj: any) {
    if (Array.isArray(obj.offers)) {
      return Provider1Mapper.map(obj);
    }

    if (obj.Offer) {
      return [Provider2Mapper.map(obj)];
    }
  }

  private getOfferFromPartial(obj: any) {
    const offer = new OfferDTO();

    Object.assign(offer, obj);

    return offer;
  }
}
