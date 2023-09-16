import { useState, useEffect } from "react";
import { fetchSearchResult } from "@/api";
import { useRouter } from "next/router";
import Head from "next/head";
import SearchBar from "@/components/SearchBar";
import CountryList from "@/components/CountryList";
import Loading from "@/components/Loading";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const setData = async () => {
      setIsLoading(true);
      if (typeof q === "string") {
        const data = await fetchSearchResult(q);
        setCountries(data);
        setIsLoading(false);
      }
    };

    if (q) {
      setData();
    }
  }, [q]);

  if (isLoading) {
    return <Loading />;
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
