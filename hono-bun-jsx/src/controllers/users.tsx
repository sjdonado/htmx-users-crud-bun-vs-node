import { type Context } from 'hono';

import { createUser, findAllUsers, findUserById, updateUser } from '~/services/user';

import Users from '../views/pages/users';
import UsersCreateModal from '~/views/components/users-create-modal';
import EmailInlineValidation from '~/views/components/email-inline-validation';
import UsersListRow from '~/views/components/users-list-row';

import logger from '~/utils/logger';
import { userEmailValidator } from '~/validators/users';
import UsersEditListRow from '~/views/components/users-edit-list-row';

export const index = async (c: Context) => {
  const users = await findAllUsers();

  return c.html(<Users users={users} />);
};

export const create = async (c: Context) => {
  // @ts-expect-error hun invalid type
  const userPayload = c.req.valid('form');

  const user = await createUser(userPayload);
  logger.info(`User created: ${JSON.stringify(user, null, 2)}`);

  c.header('HX-Trigger', 'close-create-user-modal');

  return c.html(<UsersListRow user={user} />, 201);
};

export const patch = async (c: Context) => {
  const userId = Number(c.req.param('id'));
  // @ts-expect-error hun invalid type
  const userPayload = c.req.valid('form');

  const updatedUser = await updateUser(userId, userPayload);
  logger.info(`User updated: ${JSON.stringify(updatedUser, null, 2)}`);

  return c.html(<UsersListRow user={updatedUser} />);
};

export const validationEmail = async (c: Context) => {
  const { email } = await c.req.parseBody();

  const parsed = userEmailValidator.safeParse(email);

  const errorMessage = parsed.success
    ? undefined
    : 'email not allowed, check the emailWhitelist.';

  return c.html(<EmailInlineValidation email={email} errorMessage={errorMessage} />);
};

export const viewCreateUserModal = (c: Context) => {
  return c.html(<UsersCreateModal />);
};

export const viewEditUserListRow = async (c: Context) => {
  const userId = Number(c.req.param('id'));

  const user = await findUserById(userId);

  return c.html(<UsersEditListRow user={user} />);
};
