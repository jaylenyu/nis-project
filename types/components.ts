export interface CountryProps {
  code: string;
  commonName: string;
  flagEmoji: string;
  flagImg: string;
  capital: string[];
  region: string;
  population: number;
  officialName: string;
}

export interface HomeProps {
  countries: CountryProps[];
}

export interface SearchProps {
  countries: CountryProps[];
}

export interface CountryListProps {
  countries: CountryProps[];
}

export interface CountryDataProps {
  country: CountryProps | null;
}
