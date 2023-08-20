import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { offer1Payload } from '../../test/fixtures/offers/provider1.payload';
import { offer2Payload } from '../../test/fixtures/offers/provider2.payload';

import { Offer } from './entities/offer.entity';
import { OfferValidationPipe } from './pipes/offer-validation.pipe';
import { OffersService } from './offers.service';

describe('OffersService', () => {
  let service: OffersService;
  let repository: Repository<Offer>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersService,
        OfferValidationPipe,
        {
          provide: getRepositoryToken(Offer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get(OffersService);
    repository = module.get(getRepositoryToken(Offer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOffer', () => {
    it('should create an offer - provider1', async () => {
      const mockRepositoryCreate = jest
        .spyOn(repository, 'create')
        .mockImplementation();

      const mockRepositoryInsert = jest
        .spyOn(repository, 'insert')
        .mockImplementation();

      await service.createOffer(offer1Payload);

      expect(mockRepositoryCreate).toHaveBeenCalledTimes(1);
      expect(mockRepositoryCreate).toHaveBeenCalledWith({
        name: 'MyGym - iOS',
        slug: 'slug-1',
        description: 'Play and reach level 23 within 14 days.',
        requirements: 'Play and reach level 23 within 14 days.',
        thumbnail: 'https://some.url',
        isDesktop: false,
        isAndroid: false,
        isIos: true,
        offerUrlTemplate: 'https://some.url',
        providerName: undefined,
        externalOfferId: '19524555',
        disclaimer: 'This offer rewards within 24 hours. New users only.',
      });
      expect(mockRepositoryInsert).toHaveBeenCalledTimes(1);
    });

    it('should create an offer - provider2', async () => {
      const mockRepositoryCreate = jest
        .spyOn(repository, 'create')
        .mockImplementation();

      const mockRepositoryInsert = jest
        .spyOn(repository, 'insert')
        .mockImplementation();

      await service.createOffer(offer2Payload);

      expect(mockRepositoryCreate).toHaveBeenCalledTimes(1);
      expect(mockRepositoryCreate).toHaveBeenCalledWith({
        name: 'Sofi',
        slug: 'slug-2',
        description:
          'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
        requirements:
          'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
        thumbnail: 'https://some.url',
        isDesktop: true,
        isAndroid: false,
        isIos: true,
        offerUrlTemplate: 'https://some.url',
        providerName: undefined,
        externalOfferId: '15828',
      });
      expect(mockRepositoryInsert).toHaveBeenCalledTimes(1);
    });

    it('should not create an offer', async () => {
      const mockRepositoryCreate = jest
        .spyOn(repository, 'create')
        .mockImplementation();

      const mockRepositoryInsert = jest
        .spyOn(repository, 'insert')
        .mockImplementation();

      await service.createOffer({});

      expect(mockRepositoryCreate).not.toHaveBeenCalled();
      expect(mockRepositoryInsert).not.toHaveBeenCalled();
    });
  });
});
