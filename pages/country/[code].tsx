import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { fetchCountry } from "@/api";
import { CountryDataProps } from "@/types/components";
import { GetStaticPaths, GetStaticProps } from "next";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import Head from "next/head";
import Image from "next/image";
import Loading from "@/components/Loading";
import styled from "styled-components";

export default function Country({ country }: CountryDataProps) {
  const router = useRouter();
  const { code } = router.query;
  const [mapCenter, setMapCenter] = useState({
    lat: 100,
    lng: 10,
  });

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    [],
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string,
  });

  function getLatLngBycommonName(commonName: string) {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: commonName }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const location = results?.[0]?.geometry?.location;
          if (location) {
            const lat = location.lat();
            const lng = location.lng();
            resolve({ lat, lng });
          } else {
            reject("위도와 경도를 찾을 수 없습니다.");
          }
        } else {
          reject("지오코딩에 실패했습니다.");
        }
      });
    });
  }

  useEffect(() => {
    async function fetchMapCenter() {
      if (country && isLoaded) {
        try {
          const { lat, lng } = await getLatLngBycommonName(country.commonName);
          setMapCenter({ lat, lng });
        } catch (error) {
          console.error("위치 정보를 가져오는 중 오류 발생:", error);
        }
      }
    }

    fetchMapCenter();
  }, [country, isLoaded]);

  if (router.isFallback || !country || !isLoaded) {
    return <Loading />;
  }

  const {
    flagImg,
    flagEmoji,
    commonName,
    officialName,
    capital,
    region,
    population,
  } = country;

  return (
    <>
      <Head>
        <title>{commonName} - Search Result</title>
        <meta property="og:image" content={flagImg} />
        <meta property="og:title" content={`${commonName} - Search Result`} />
        <meta
          property="og:description"
          content={`${commonName} - Information`}
        />
      </Head>
      <div className="flex justify-around h-fit p-20 sx:p-10 md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center sx:flex sx:flex-col sx:items-center">
        <div className="w-120 md:flex md:flex-col md:items-center md:mb-10 sm:flex sm:flex-col sm:items-center sm:w-full sm:mb-5 sx:flex sx:flex-col sx:items-center sx:h-fit sx:w-full sx:mb-5">
          <CountryTitle>{officialName}</CountryTitle>
          <div className="relative h-80 w-120 sm:w-80 sm:h-52 sx:w-80 sx:h-52">
            <Image
              src={flagImg}
              fill
              sizes="lx"
              priority={true}
              alt="nation flag"
              className="h-1/2 w-full rounded-lg shadow-2xl"
            />
          </div>
          <div className="flex flex-col justify-center items-start h-fit w-120 mt-10 leading-10 md:mt-10 sm:w-80 sm:h-fit sm:mt-10 sx:w-80 sx:h-fit sx:mt-10">
            <div>
              <b>Code</b> : {code}
            </div>
            {commonName === officialName ? (
              <div>
                <b>Official Name</b> : {flagEmoji} {commonName}
              </div>
            ) : (
              <>
                <div>
                  <b>Nation Name</b> : {flagEmoji} {commonName}
                </div>
                <div>
                  <b>Official Name</b> : {flagEmoji} {officialName}
                </div>
              </>
            )}
            <div>
              <b>Capital</b> : {capital}
            </div>
            <div>
              <b>Region</b> : {region}
            </div>
            <div>
              <b>Population</b> : {population.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="w-120 h-120 lg:w-96 lg:h-96 sm:w-80 sm:h-80 sm:flex sm:flex-col sm:items-center sx:w-80 sx:h-80 sx:flex sx:flex-col sx:items-center">
          <CountryTitle>Location</CountryTitle>
          <GoogleMap
            options={{
              ...mapOptions,
              mapTypeId: google.maps.MapTypeId.HYBRID,
            }}
            zoom={5}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.HYBRID}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "0.5rem",
            }}
          >
            <MarkerF position={mapCenter} />
          </GoogleMap>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const codes = ["ABW", "AFG", "AGO", "AIA", "ALA"];

  const paths = codes.map(code => ({ params: { code } }));

  return {
    paths,
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
        revalidate: 3,
      };
    }
  }

  return {
    notFound: true,
  };
};

const CountryTitle = styled.h3`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  overflow: visible;
`;
