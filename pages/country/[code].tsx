import { useRouter } from "next/router";
import { fetchCountry } from "@/api";
import { CountryDataProps } from "@/types/components";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Country({ country }: CountryDataProps) {
  const router = useRouter();
  const { code } = router.query;

  if (router.isFallback || !country) {
    return (
      <>
        <Head>
          <title>NIS</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="NIS" />
          <meta
            property="og:description"
            content="National Infomation System"
          />
        </Head>
        <div>Loading...</div>
      </>
    );
  }

  const {
    flagImg,
    flagEmoji,
    commonName,
    officialName,
    capital,
    region,
    population,
    googleMapURL,
  } = country;

  return (
    <>
      <Head>
        <title>{commonName} - Search Result</title>
        <meta property="og:image" content={flagImg} />
        <meta property="og:title" content={`${commonName} - Search Result`} />
        <meta
          property="og:description"
          content={`${commonName} - Infomation`}
        />
      </Head>
      <div className="flex flex-col justify-center items-center p-20">
        <div className="relative h-80 w-120">
          <Image
            src={flagImg}
            fill
            alt="nation flag"
            className="h-full w-full rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center items-start h-80 w-120  leading-10">
          <div>
            <b>국가 코드</b> : {code}
          </div>
          {commonName === officialName ? (
            <div>
              <b>국가 이름 및 공식 명칭</b> : {flagEmoji} {commonName}
            </div>
          ) : (
            <>
              <div>
                <b>국가 이름</b> : {flagEmoji} {commonName}
              </div>
              <div>
                <b>공식 명칭</b> : {flagEmoji} {officialName}
              </div>
            </>
          )}
          <div>
            <b>국가 수도</b> : {capital}
          </div>
          <div>
            <b>지역</b> : {region}
          </div>
          <div>
            <b>인구</b> : {population}
          </div>
          <div>
            <b>지도 보기</b> :{" "}
            <Link
              className="text-slate-500 underline decoration-slate-500/30"
              href={googleMapURL}
            >
              GoogleMap
            </Link>
          </div>
        </div>
      </div>
    </>
  );
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
