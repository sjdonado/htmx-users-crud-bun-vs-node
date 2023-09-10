import { User } from '~/model/schema/user';

import { fortmatDateTime } from '../common/date';

const UsersListRow = (props: { user: User }) => {
  return (
    <div id={`users-list-row-${props.user.id}`} class="border flex py-2">
      <span class="w-1/4 px-4 truncate" title="{props.user.email}">
        {props.user.email}
      </span>
      <span class="w-1/6 px-4 truncate" title="{props.user.hash}">
        {props.user.hash}
      </span>
      <span class="w-1/6 px-4 truncate" title="{props.user.counter}">
        {props.user.counter}
      </span>
      <span
        class="w-1/3 px-4 truncate"
        title={`${fortmatDateTime(props.user.createdAt)}`}
      >
        {fortmatDateTime(props.user.createdAt)}
      </span>
      <div class="w-1/6 flex space-x-4 px-4 py-2">
        <button
          class="text-blue-500 hover:text-blue-700 underline"
          hx-get={`/users/views/edit/${props.user.id}`}
          hx-trigger="click"
          hx-target={`#users-list-row-${props.user.id}`}
        >
          Edit
        </button>
        <button
          class="text-blue-500 hover:text-blue-700 underline"
          hx-delete={`/users/${props.user.id}`}
          hx-confirm="Are you sure you want to delete this props.user?"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UsersListRow;
