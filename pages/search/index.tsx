import { useState, useEffect } from "react";
import { fetchSearchResult } from "@/api";
import { useRouter } from "next/router";
import Head from "next/head";
import SearchBar from "@/components/SearchBar";
import CountryList from "@/components/CountryList";
import Spinner from "@/components/Spinner";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setData = async () => {
    setIsLoading(true);
    if (typeof q === "string") {
      const data = await fetchSearchResult(q);
      setCountries(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (q) {
      setData();
    }
  }, [q]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <title>{q} - NIS Search Result</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="NIS Search Result" />
        <meta property="og:description" content="National Infomation System" />
      </Head>
      <SearchBar countries={countries} />
      <CountryList countries={countries} />
    </>
  );
}
