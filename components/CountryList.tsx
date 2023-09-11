import { CountryListProps } from "@/types/components";
import CountryItem from "./CountryItem";

export default function CountryList({ countries }: CountryListProps) {
  return (
    <div className="grid grid-cols-5 p-10 gap-10 justify-items-center	 box-border lg:grid-cols-4 lg:p-10 md:grid-cols-3 sm:grid-cols-2 sx:flex flex-col justify-center items-center">
      {countries.map(country => (
        <CountryItem key={country.code} {...country} />
      ))}
    </div>
  );
}

CountryList.defaultProps = {
  countries: [],
};
