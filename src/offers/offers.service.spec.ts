import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Offer } from './entities/offer.entity';
import { OfferService } from './offers.service';

import { offer1Payload } from '../../test/fixtures/offers/offer2.payload';
import { OfferValidationPipe } from './pipes/offer-validation.pipe';

describe('OfferService', () => {
  let service: OfferService;
  let repository: Repository<Offer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferService,
        OfferValidationPipe,
        {
          provide: getRepositoryToken(Offer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get(OfferService);
    repository = module.get(getRepositoryToken(Offer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOffer', () => {
    it('should create an offer', async () => {
      const mockRepositoryCreate = jest
        .spyOn(repository, 'create')
        .mockImplementation();

      const result = await service.createOffer(offer1Payload);

      console.log(result);
      // expect(result).toEqual();
      expect(mockRepositoryCreate).toHaveBeenCalledTimes(1);
    });

    // it('should throw BadRequestException when offerPayload is not valid', async () => {
    //   const mockInvalidOfferPayload: any = {
    //     // ... invalid payload
    //   };
    //
    //   jest
    //     .spyOn(repository, 'create')
    //     .mockReturnValue(mockInvalidOfferPayload as Offer);
    //
    //   await expect(
    //     service.createOffer(mockInvalidOfferPayload),
    //   ).rejects.toThrow(BadRequestException);
    // });

    // it('should not throw when offerPayload is missing', async () => {
    //   await expect(service.createOffer()).resolves.not.toThrow();
    // });
  });
});
