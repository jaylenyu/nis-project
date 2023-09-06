import { fetchSearchResult } from "@/api";
import { GetServerSideProps } from "next";
import { SearchProps } from "@/types/components";

export default function Search({ countries }: SearchProps) {
  console.log(countries);
  return (
    <div className="Search">
      {countries.map(country => (
        <div key={country.code}>{country.code}</div>
      ))}
      search
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { q } = context.query;

  let countries = [];
  if (q) {
    if (typeof q === "string") {
      countries = await fetchSearchResult(q);
    } else {
      countries = await fetchSearchResult(q[0]);
    }
  }
  return {
    props: {
      countries,
    },
  };
};
