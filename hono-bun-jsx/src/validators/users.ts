import { z } from 'zod';

export const userEmailValidator = z
  .string()
  .email()
  .regex(/^(test[0-9]?|testing[0-9]?|dev[0-9]?)+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

export const userCreatePayloadValidator = z.object({
  email: userEmailValidator,
  hash: z.string(),
});

export const userUpdatePayloadValidator = z.object({
  ...userCreatePayloadValidator.shape,
  counter: z.string().transform(c => Number(c)),
});
