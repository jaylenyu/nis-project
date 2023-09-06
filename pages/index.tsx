import { fetchCountries } from "@/api";
import SearchBar from "@/components/SearchBar";
import CountryList from "@/components/CountryList";
import { HomeProps } from "@/types/components";

export default function Home({ countries }: HomeProps) {
  return (
    <div>
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
