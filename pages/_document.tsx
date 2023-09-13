import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link type="image" rel="icon" href="/favicon.ico" />
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbzBSLkpSrA8eg1evKyRLSpDhuuGdjFk4&libraries=places"
          async
          defer
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
