function showInterceptorSnackbar(message) {
  const interceptorNavbar = document.createElement('div');
  interceptorNavbar.id = 'htmx-requests-interceptor-interceptorNavbar';
  interceptorNavbar.className =
    'hidden bg-gray-500 text-white px-4 py-2 rounded shadow-md fixed bottom-4 right-4 transition duration-300';
  interceptorNavbar.textContent = message;
  interceptorNavbar.classList.remove('hidden');

  document.body.appendChild(interceptorNavbar);

  setTimeout(function () {
    interceptorNavbar.classList.add('hidden');
  }, 3000); // Hide the interceptorNavbar after 3 seconds
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

  const message = `${url} [${status}] completed in ${requestDuration}ms.`;

  showInterceptorSnackbar(message);
});
