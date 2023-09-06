import { useRouter } from "next/router";
import { fetchCountry } from "@/api";
import { CountryDataProps } from "@/types/components";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Country({ country }: CountryDataProps) {
  const router = useRouter();
  const { code } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <div>{country?.code}</div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { code: "" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { code } = context.params || {};

  if (typeof code === "string") {
    const country = await fetchCountry(code);

    if (country) {
      return {
        props: {
          country,
        },
        revalidate: 3, // 3초 주기로 재생성
      };
    }
  }

  return {
    notFound: true,
  };
};
