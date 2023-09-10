function showInterceptorSnackbar(message) {
  const snackbar = document.createElement('div');

  snackbar.id = 'htmx-requests-interceptor-snackbar';
  snackbar.className =
    'bg-gray-500 text-white px-4 py-2 rounded shadow-md fixed bottom-4 right-4 transition duration-300';
  snackbar.textContent = message;

  document.body.appendChild(snackbar);

  setTimeout(function () {
    snackbar.remove();
  }, 3000);
}

document.addEventListener('htmx:beforeRequest', function (event) {
  event.detail.requestStart = new Date().getTime();
  event.detail.requestMethod = event.detail.method;
});

document.addEventListener('htmx:afterOnLoad', function (event) {
  const xhr = event.detail.xhr;
  const requestStart = event.detail.requestStart;
  const requestEndTime = new Date().getTime();
  const requestDuration = requestEndTime - requestStart;

  const status = xhr.status;
  const url = xhr.responseURL;

  if (status !== 400) {
    const message = `${url} [${status}] completed in ${requestDuration}ms.`;
    showInterceptorSnackbar(message);
  }
});
