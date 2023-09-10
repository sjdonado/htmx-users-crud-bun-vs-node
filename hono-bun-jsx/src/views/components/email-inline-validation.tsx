import { User } from '~/model/schema/user';

const EmailInlineValidation = (props: {
  email: User['email'];
  errorMessage?: string;
}) => {
  return (
    <div hx-target="this" hx-swap="outerHTML" class="mb-2">
      <label class="block text-gray-700 text-sm font-bold" for="email">
        Email:
      </label>
      <input
        hx-post="/users/validation/email"
        hx-params="email"
        hx-indicator="#email-inline-validation-loading-bar"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={props.email}
        required
      />
      {props.errorMessage && (
        <span class="text-red-500 text-sm m-1">{props.errorMessage}</span>
      )}
      <div
        id="email-inline-validation-loading-bar"
        class="htmx-indicator relative h-4 bg-gray-200"
      >
        <div
          class="absolute top-0 left-0 h-full bg-teal-500"
          style="width: 70%; transition: width 0.3s ease-in-out;"
        ></div>
      </div>
    </div>
  );
};

export default EmailInlineValidation;
