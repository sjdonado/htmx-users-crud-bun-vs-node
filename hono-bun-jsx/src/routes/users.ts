import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import {
  index,
  create,
  patch,
  validationEmail,
  viewCreateUserModal,
  viewEditUserListRow,
} from '~/controllers/users';
import { userPayloadValidator } from '~/validators/users';

const usersRoute = new Hono();

usersRoute.get('/', index);
usersRoute.get('/views/create', viewCreateUserModal);
usersRoute.get('/views/edit/:id', viewEditUserListRow);

usersRoute.post('/', zValidator('form', userPayloadValidator), create);
usersRoute.post('/validation/email', validationEmail);
usersRoute.patch('/:id', zValidator('form', userPayloadValidator), patch);

export default usersRoute;
