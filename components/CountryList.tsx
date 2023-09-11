import { CountryListProps } from "@/types/components";
import CountryItem from "./CountryItem";

export default function CountryList({ countries }: CountryListProps) {
  return (
    <div className="grid grid-cols-5 gap-10 w-screen justify-items-center p-12 lg:grid-cols-4 md:grid-cols-3 md:p-8 sm:grid-cols-2 sm:p-8 sx:grid-cols-1">
      {countries.map(country => (
        <CountryItem key={country.code} {...country} />
      ))}
    </div>
  );
}

CountryList.defaultProps = {
  countries: [],
};
