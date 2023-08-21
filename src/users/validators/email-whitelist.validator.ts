import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'emailWhitelist', async: false })
export class EmailWhiteListValidator implements ValidatorConstraintInterface {
  validate(email: string) {
    const emailWhitelist =
      /^(test|testing|user[1-9]?|userx|john\.doe|jane\.smith|info|contact|support|webmaster)@(gmail\.com|test\.com|icloud\.com|yahoo\.com|hotmail\.com|outlook\.com|aol\.com|protonmail\.com|mail\.ru|yandex\.com|zoho\.com|inbox\.lv|fastmail\.com|gmx\.(net|com)|tutanota\.com|qq\.com|163\.com|sina\.com|sohu\.com|web\.de)$/i;

    return emailWhitelist.test(email);
  }

  defaultMessage() {
    return 'Invalid email, try with testing@gmail.com, user1@test.com, userx@outlook.com, john.doe@yahoo.com';
  }
}
