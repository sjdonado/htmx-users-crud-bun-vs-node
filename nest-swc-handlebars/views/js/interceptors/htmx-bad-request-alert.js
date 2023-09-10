function showBadRequestSnackbar(message) {
  const snackbar = document.createElement('div');

  snackbar.id = 'htmx-requests-interceptor-snackbar';
  snackbar.className =
    'bg-red-500 text-white px-4 py-2 rounded shadow-md fixed bottom-4 right-4 transition flex items-center';
  snackbar.style.zIndex = '9999';
  snackbar.innerHTML = `
    ${message} <button id="close-snackbar" class="text-white ml-2 text-3xl">&times;</button>
  `;

  document.body.appendChild(snackbar);

  const closeButton = document.getElementById('close-snackbar');
  closeButton.addEventListener('click', function () {
    snackbar.remove();
  });
}

document.addEventListener('htmx:responseError', function (event) {
  if (event.detail.xhr.status === 400) {
    const { message } = JSON.parse(event.detail.xhr.response);
    showBadRequestSnackbar(message[0]);
  }
});
