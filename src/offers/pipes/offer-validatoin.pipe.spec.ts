import { offer1Payload } from '../../../test/fixtures/offers/provider1.payload';
import { offer2Payload } from '../../../test/fixtures/offers/provider2.payload';

import { OfferValidationPipe } from './offer-validation.pipe';

describe('OfferValidationPipe', () => {
  let pipe: OfferValidationPipe;

  beforeAll(async () => {
    pipe = new OfferValidationPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    it('should return mapped and validated data - provider1', async () => {
      const result = await pipe.transform(offer1Payload);

      expect(result).toEqual([
        {
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
        },
      ]);
    });

    it('should return mapped and validated data - provider2', async () => {
      const result = await pipe.transform(offer2Payload);

      expect(result).toEqual([
        {
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
        },
      ]);
    });

    it('should return undefined for invalid data', async () => {
      const offer3Payload = {
        ...offer2Payload.data['15828'].Offer,
        slug: undefined,
      };

      const result = await pipe.transform(offer3Payload);

      expect(result).toBeUndefined();
    });
  });
});
