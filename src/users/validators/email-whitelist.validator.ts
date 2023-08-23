import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'emailWhitelist', async: false })
export class EmailWhiteListValidator implements ValidatorConstraintInterface {
  validate(email: string) {
    const emailWhitelist =
      /^(test[0-9]?|testing[0-9]?|dev[0-9]?)+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailWhitelist.test(email);
  }

  defaultMessage() {
    return 'Not allowed, check the emailWhitelist.';
  }
}
