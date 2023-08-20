interface OfferData {
  Offer: {
    campaign_id: number;
    store_id: number | null;
    tracking_type: string;
    campaign_vertical: string;
    currency_name_singular: string;
    currency_name_plural: string;
    network_epc: string;
    icon: string;
    name: string;
    tracking_url: string;
    instructions: string;
    disclaimer: string | null;
    description: string;
    slug: string;
    short_description: string;
    offer_sticker_text_1: string;
    offer_sticker_text_2: string | null;
    offer_sticker_text_3: string | null;
    offer_sticker_color_1: string;
    offer_sticker_color_2: string;
    offer_sticker_color_3: string;
    sort_order_setting: string | null;
    category_1: string;
    category_2: string | null;
    amount: number;
    payout_usd: number;
    start_datetime: string;
    end_datetime: string;
    is_multi_reward: boolean;
  };
  Country: {
    include: {
      [key: string]: {
        id: number;
        code: string;
        name: string;
      };
    };
    exclude: string[];
  };
  State: {
    include: string[];
    exclude: string[];
  };
  City: {
    include: string[];
    exclude: string[];
  };
  Connection_Type: {
    cellular: boolean;
    wifi: boolean;
  };
  Device: {
    include: string[];
    exclude: string[];
  };
  OS: {
    android: boolean;
    ios: boolean;
    web: boolean;
    min_ios: string | null;
    max_ios: string | null;
    min_android: string | null;
    max_android: string | null;
  };
}

export class Provider2Mapper {
  static map(data: OfferData) {
    return {
      slug: data.Offer.slug,
      externalOfferId: String(data.Offer.campaign_id),
      thumbnail: data.Offer.icon,
      name: data.Offer.name,
      offerUrlTemplate: data.Offer.tracking_url,
      requirements: data.Offer.instructions,
      description: data.Offer.description,
      isAndroid: data.OS.android,
      isIos: data.OS.ios,
      isDesktop: data.OS.web,
    };
  }
}
