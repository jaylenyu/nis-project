import { fetchCountries } from "@/api";
import { Country } from "@/types/components";

export default function Home({ countries }: { countries: Country[] }) {
  return (
    <div>
      {countries.map(country => (
        <div key={country.code}>{country.commonName}</div>
      ))}
    </div>
  );
}

export const getServerSideProps = async () => {
  const countries = await fetchCountries();

  return {
    props: {
      countries,
    },
  };
};
