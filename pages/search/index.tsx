import { useState, useEffect } from "react";
import { fetchSearchResult } from "@/api";
import { GetServerSideProps } from "next";
import { SearchProps } from "@/types/components";
import { useRouter } from "next/router";
import SearchBar from "@/components/SearchBar";
import CountryList from "@/components/CountryList";

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

  console.log(countries);

  return (
    <>
      <SearchBar />
      <CountryList countries={countries} />
    </>
  );
}
