import { CountryListProps } from "@/types/components";
import CountryItem from "./CountryItem";

export default function CountryList({ countries }: CountryListProps) {
  return (
    <div className="grid grid-cols-5 gap-10 w-screen p-12">
      {countries.map(Country => (
        <CountryItem key={Country.code} {...Country} />
      ))}
    </div>
  );
}

CountryList.defaultProps = {
  countries: [],
};
