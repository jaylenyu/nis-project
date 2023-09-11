import { fetchCountries } from "@/api";
import SearchBar from "@/components/SearchBar";
import CountryList from "@/components/CountryList";
import { HomeProps } from "@/types/components";
import Head from "next/head";

export default function Home({ countries }: HomeProps) {
  return (
    <div>
      <Head>
        <title>NIS</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="NIS" />
        <meta property="og:description" content="National Infomation System" />
      </Head>
      <SearchBar />
      <CountryList countries={countries} />
    </div>
  );
}

export const getStaticProps = async () => {
  const countries = await fetchCountries();

  return {
    props: {
      countries,
    },
  };
};
