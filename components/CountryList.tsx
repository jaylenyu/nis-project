import { CountryListProps } from "@/types/components";
import CountryItem from "./CountryItem";

export default function CountryList({ countries }: CountryListProps) {
  return (
    <div className="grid grid-cols-5 gap-10 w-screen p-12 lg:grid-cols-4 md:grid-cols-3 sm:flex sx:flex flex-col justify-center items-center">
      {countries.map(country => (
        <CountryItem key={country.code} {...country} />
      ))}
    </div>
  );
}

CountryList.defaultProps = {
  countries: [],
};
