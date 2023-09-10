import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import {
  index,
  create,
  patch,
  remove,
  validationEmail,
  viewCreateUserModal,
  viewEditUsersListRow,
  viewUsersListRow,
} from '~/controllers/users';

import {
  userCreatePayloadValidator,
  userUpdatePayloadValidator,
} from '~/validators/users';

const usersRoute = new Hono();

usersRoute.get('/', index);
usersRoute.get('/views/create', viewCreateUserModal);
usersRoute.get('/views/edit/:id', viewEditUsersListRow);
usersRoute.get('/views/cancel/edit/:id', viewUsersListRow);

usersRoute.post('/', zValidator('form', userCreatePayloadValidator), create);
usersRoute.post('/validation/email', validationEmail);
usersRoute.patch('/:id', zValidator('form', userUpdatePayloadValidator), patch);
usersRoute.delete('/:id', remove);

export default usersRoute;
