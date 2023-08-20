import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { offer1Payload } from '../../test/fixtures/offers/provider1.payload';
import { offer2Payload } from '../../test/fixtures/offers/provider2.payload';

import { Offer } from '../../src/offers/entities/offer.entity';
import { AppModule } from '../../src/app.module';
import { OffersService } from '../../src/offers/offers.service';

describe('OffersService', () => {
  let service: OffersService;
  let offerRepository: Repository<Offer>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get(OffersService);
    offerRepository = module.get<Repository<Offer>>(getRepositoryToken(Offer));

    await offerRepository.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOffer', () => {
    it('should create an offer - provider1', async () => {
      const result = await service.createOffer(offer1Payload);

      expect(result).toEqual({
        identifiers: expect.anything(),
        generatedMaps: expect.anything(),
        raw: expect.any(Number),
      });
    });

    it('should create an offer - provider2', async () => {
      const result = await service.createOffer(offer2Payload);

      expect(result).toEqual({
        identifiers: expect.anything(),
        generatedMaps: expect.anything(),
        raw: expect.any(Number),
      });
    });
  });
});
