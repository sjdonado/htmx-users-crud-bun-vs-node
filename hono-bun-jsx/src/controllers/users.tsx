import { type Context } from 'hono';

import { createUser, findAllUsers } from '~/services/user';

import Users from '../views/pages/users';
import UsersCreateModal from '~/views/components/users-create-modal';
import EmailInlineValidation from '~/views/components/email-inline-validation';
import UserListRow from '~/views/components/users-list-row';

import logger from '~/utils/logger';
import { userEmailValidator } from '~/validators/users';

export const index = async (c: Context) => {
  const users = await findAllUsers();

  return c.html(<Users users={users} />);
};

export const create = async (c: Context) => {
  // @ts-expect-error hun invalid type
  const userPayload = c.req.valid('form');

  const user = await createUser(userPayload);

  logger.info('User created', JSON.stringify(user, null, 2));

  c.header('HX-Trigger', 'close-create-user-modal');
  c.status(201);

  return c.html(<UserListRow user={user} />);
};

export const validationEmail = async (c: Context) => {
  const { email } = await c.req.parseBody();

  const parsed = userEmailValidator.safeParse(email);

  const errorMessage = parsed.success
    ? undefined
    : 'Not allowed, check the emailWhitelist.';

  return c.html(<EmailInlineValidation email={email} errorMessage={errorMessage} />);
};

export const viewCreateUserModal = (c: Context) => {
  return c.html(<UsersCreateModal />);
};
