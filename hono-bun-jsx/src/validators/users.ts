import { z } from 'zod';

export const userEmailValidator = z
  .string()
  .email()
  .regex(/^(test[0-9]?|testing[0-9]?|dev[0-9]?)+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

export const userPayloadValidator = z.object({
  email: userEmailValidator,
  hash: z.string(),
  counter: z.string().transform(c => Number(c)),
});
