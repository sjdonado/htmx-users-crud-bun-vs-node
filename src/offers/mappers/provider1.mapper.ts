interface OfferData {
  offer_id: string;
  offer_name: string;
  offer_desc: string;
  call_to_action: string;
  disclaimer: string;
  offer_url: string;
  offer_url_easy: string;
  payout: number;
  payout_type: string;
  amount: number;
  image_url: string;
  image_url_220x124: string;
  countries: string[];
  platform: string;
  device: string;
  slug: string;
  category: {
    [key: string]: string;
  };
  last_modified: number;
  preview_url: string;
  package_id: string;
  verticals: {
    vertical_id: string;
    vertical_name: string;
  }[];
}

interface OfferListPayload {
  offers: OfferData[];
}

export class Provider1Mapper {
  static map(payload: OfferListPayload) {
    const offers = payload.offers.map(this.mapOffer);

    return offers;
  }

  private static mapOffer(offer: OfferData) {
    return {
      slug: offer.slug,
      externalOfferId: offer.offer_id,
      name: offer.offer_name,
      description: offer.offer_desc,
      requirements: offer.call_to_action,
      offerUrlTemplate: offer.offer_url,
      disclaimer: offer.disclaimer,
      thumbnail: offer.image_url,
      isDesktop: offer.platform === 'desktop',
      isAndroid: offer.device !== 'iphone_ipad',
      isIos: offer.device === 'iphone_ipad',
    };
  }
}
