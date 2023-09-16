import Head from "next/head";
import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <>
      <Head>
        <title>NIS</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="NIS" />
        <meta property="og:description" content="National Information System" />
      </Head>
      <Spinner />
    </>
  );
}
