import EmailInlineValidation from './email-inline-validation';

const UsersCreateModal = () => {
  return (
    <div
      id="create-user-modal"
      class="modal absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div class="modal-content bg-white rounded w-1/3">
        <button
          hx-on:click='htmx.find("#create-user-modal").remove()'
          class="my-2 mx-4 text-2xl"
        >
          &times;
        </button>
        <h2 class="text-xl font-semibold mx-6">Create User</h2>
        <form
          hx-post="/users"
          hx-target="#users-list"
          hx-swap="afterbegin"
          class="p-6"
          hx-on:close-create-user-modal='htmx.find("#create-user-modal").remove()'
        >
          <EmailInlineValidation email="" />
          <div class="mb-4 w-full">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="hash">
              Hash:
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hash"
              name="hash"
              type="text"
              placeholder="ABCD0&*!@#$abc+9"
              required
            />
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 p-2 w-full rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsersCreateModal;
