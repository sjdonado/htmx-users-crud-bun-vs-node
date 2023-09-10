import { HtmlEscapedString } from 'hono/utils/html';

const MainLayout = (props: { children: HtmlEscapedString }) => {
  return (
    <html>
      <head>
        <title>Hono HTMX</title>
        <meta name="description" content="Hono HTMX demo app" />
      </head>
      <body>{props.children}</body>
    </html>
  );
};

export default MainLayout;
