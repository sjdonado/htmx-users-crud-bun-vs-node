import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Offer } from './entities/offer.entity';
import { OffersService } from './offers.service';
import { OfferValidationPipe } from './pipes/offer-validation.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  controllers: [],
  providers: [OffersService, OfferValidationPipe],
})
export class OffersModule {}
