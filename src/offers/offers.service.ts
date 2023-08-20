import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Offer } from './entities/offer.entity';
import { OfferValidationPipe } from './pipes/offer-validation.pipe';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly offerValidationPipe: OfferValidationPipe,
  ) {}

  async createOffer(offerPayload: any) {
    const validatedOffers =
      await this.offerValidationPipe.transform(offerPayload);

    if (!validatedOffers) {
      return;
    }

    const offersToInsert = validatedOffers.map((data) =>
      this.offerRepository.create(data as unknown as Offer),
    );

    const result = await this.offerRepository.insert(offersToInsert);

    return result;
  }
}
