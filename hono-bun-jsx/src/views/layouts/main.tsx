import { HtmlEscapedString } from 'hono/utils/html';

const MainLayout = (props: { children: HtmlEscapedString }) => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />

        <title>Users CRUD with htmx demo app</title>

        <script src="https://unpkg.com/htmx.org@1.9.5"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/preload.js"></script>
        <meta name="htmx-config" content='{"defaultSwapStyle":"outerHTML"}' />

        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body class="bg-gray-100 p-4" hx-boost="true" hx-ext="preload">
        <body>{props.children}</body>
        <script src="/public/interceptors/htmx-requests-interceptor.js"></script>
        <script src="/public/interceptors/htmx-bad-request-alert.js"></script>
      </body>
    </html>
  );
};

export default MainLayout;
