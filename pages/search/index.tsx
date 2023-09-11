import { useState, useEffect } from "react";
import { fetchSearchResult } from "@/api";
import { useRouter } from "next/router";
import SearchBar from "@/components/SearchBar";
import CountryList from "@/components/CountryList";
import Head from "next/head";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [countries, setCountries] = useState([]);

  const setData = async () => {
    if (typeof q === "string") {
      const data = await fetchSearchResult(q);
      setCountries(data);
    }
  };

  useEffect(() => {
    if (q) {
      setData();
    }
  }, [q]);

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
