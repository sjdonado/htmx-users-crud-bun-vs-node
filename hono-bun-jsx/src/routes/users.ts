import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { index, create, viewCreateUserModal, validationEmail } from '~/controllers/users';
import { userPayloadValidator } from '~/validators/users';

const usersRoute = new Hono();

usersRoute.get('/', index);
usersRoute.get('/views/create', viewCreateUserModal);

usersRoute.post('/', zValidator('form', userPayloadValidator), create);
usersRoute.post('/validation/email', validationEmail);

export default usersRoute;
