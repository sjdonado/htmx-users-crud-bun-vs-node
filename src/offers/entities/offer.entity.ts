import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers')
export class Offer {
  // primary column for offer id
  @PrimaryGeneratedColumn()
  id: number;

  // offer name
  @Column({ type: 'varchar', length: 255 })
  name: string;

  // unique identifier for offer
  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  // offer description
  @Column({ type: 'text' })
  description: string;

  // offer requirements
  @Column({ type: 'text' })
  requirements: string;

  // offer thumbnail image url
  @Column({ type: 'varchar', length: 255 })
  thumbnail: string;

  // indicates if offer is available for desktop
  @Column({ type: 'tinyint', width: 1, default: 0, name: 'is_desktop' })
  isDesktop: number;

  // indicates if offer is available for android
  @Column({ type: 'tinyint', width: 1, default: 0, name: 'is_android' })
  isAndroid: number;

  // indicates if offer is available for ios
  @Column({ type: 'tinyint', width: 1, default: 0, name: 'is_ios' })
  isIos: number;

  // offer url template
  @Column({ type: 'varchar', length: 256, name: 'offer_url_template' })
  offerUrlTemplate: string;

  // provider name - this should be static for each offer type
  // we're attaching two offer payloads - offer1, offer2
  // so for offer1 payload, this should be "offer1"
  // for offer2 payload, this should be "offer2"
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    name: 'provider_name',
  })
  providerName: string;

  // offer id from external provider
  @Column({
    type: 'varchar',
    length: 255,
    name: 'external_offer_id',
    nullable: true,
  })
  externalOfferId: string;
}
