import { IsString, IsBoolean, IsUrl, IsOptional } from 'class-validator';

export class OfferDTO {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsString()
  requirements: string;

  @IsUrl()
  thumbnail: string;

  @IsBoolean()
  isDesktop: boolean;

  @IsBoolean()
  isAndroid: boolean;

  @IsBoolean()
  isIos: boolean;

  @IsString()
  offerUrlTemplate: string;

  @IsString()
  @IsOptional()
  providerName: string;

  @IsString()
  @IsOptional()
  externalOfferId: string;
}
