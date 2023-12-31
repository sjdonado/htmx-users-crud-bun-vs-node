import MainLayout from '../layouts/main';

import { User } from '~/model/schema/user';

import UsersListRow from '../components/users-list-row';

const Users = (props: { users: User[] }) => (
  <MainLayout>
    <div class="mx-24 bg-white p-6 rounded shadow overflow-x-auto">
      <h1 class="text-xl font-semibold mb-4">Users</h1>
      <button
        hx-get="/users/views/create"
        hx-trigger="click"
        hx-target="body"
        hx-swap="beforeend"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold mb-4 p-2 w-full rounded focus:outline-none focus:shadow-outline"
        preload
      >
        New User
      </button>
      <div class="border border-gray-300 divide-y divide-gray-300">
        <div class="flex py-2 font-semibold">
          <span class="w-1/4 px-4">Email</span>
          <span class="w-1/6 px-4">Hash</span>
          <span class="w-1/6 px-4">Counter</span>
          <span class="w-1/3 px-4">Created at</span>
          <span class="w-1/6 px-4">Actions</span>
        </div>
        <div id="users-list">
          {props.users.map(user => (
            <UsersListRow user={user} />
          ))}
        </div>
      </div>
    </div>
  </MainLayout>
);

export default Users;
