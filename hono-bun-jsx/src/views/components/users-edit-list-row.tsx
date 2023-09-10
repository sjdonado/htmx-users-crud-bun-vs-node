import { User } from '~/model/schema/user';

import { fortmatDateTime } from '../common/date';

const UsersEditListRow = (props: { user: User }) => {
  return (
    <div id={`users-list-row-${props.user.id}`} class="border flex py-2">
      <form
        class="flex w-full"
        hx-patch={`/users/${props.user.id}`}
        hx-target={`#users-list-row-${props.user.id}`}
        hx-validate
      >
        <span class="w-1/4 px-4">
          <input
            class="border border-blue-500 w-full"
            type="text"
            name="email"
            value={`${props.user.email}`}
            required
          />
        </span>
        <span class="w-1/6 px-4">
          <input
            class="border border-blue-500 w-full"
            type="text"
            name="hash"
            value={`${props.user.hash}`}
            required
          />
        </span>
        <span class="w-1/6 px-4">
          <input
            class="border border-blue-500 w-full"
            type="number"
            name="counter"
            value={`${props.user.counter}`}
            required
          />
        </span>
        <span class="w-1/3 px-4">{fortmatDateTime(props.user.createdAt)}</span>

        <div class="w-1/6 flex space-x-4 px-4 py-2">
          <button type="submit" class="text-blue-500 hover:text-blue-700 underline">
            Save
          </button>
          <button
            class="text-blue-500 hover:text-blue-700 underline"
            hx-get={`/users/views/cancel/edit/${props.user.id}`}
            hx-target={`#users-list-row-${props.user.id}`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersEditListRow;
