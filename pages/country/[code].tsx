import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { fetchCountry } from "@/api";
import { CountryDataProps } from "@/types/components";

export default function Country({ country }: CountryDataProps) {
  const router = useRouter();
  const { code } = router.query;

  return <div>{country?.commonName}</div>;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { code } = context.params || {};

  if (typeof code === "string") {
    const country = await fetchCountry(code);

    if (country) {
      return {
        props: {
          country,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};
