import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { fetchCountry } from "@/api";
import { CountryDataProps } from "@/types/components";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";

export default function Country({ country }: CountryDataProps) {
  const router = useRouter();
  const { code } = router.query;

  const [mapCenter, setMapCenter] = useState({
    lat: 0,
    lng: 0,
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

  useEffect(() => {
    if (country) {
      getLatLngBycommonName(country.commonName)
        .then(({ lat, lng }) => {
          setMapCenter({ lat, lng });
        })
        .catch(error => {
          console.error("위치 정보를 가져오는 중 오류 발생:", error);
        });
    }
  }, [country]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

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
      <div className="flex flex-col justify-center items-center h-fit p-20 sx:p-10">
        <div className="relative h-80 w-120 sm:w-80 sm:h-52 sx:w-80 sx:h-52">
          <Image
            src={flagImg}
            fill
            priority={true}
            alt="nation flag"
            className="h-1/2 w-full rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center items-start h-80 w-120 leading-10 sm:w-80 sm:h-fit sm:mt-10 sx:w-80 sx:h-fit sx:mt-10">
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
          <div>
            <b>Map</b> :{" "}
            <Link
              className="text-slate-500 underline decoration-slate-500/30"
              href={googleMapURL}
            >
              GoogleMap
            </Link>
          </div>
        </div>
        <GoogleMap
          options={{
            ...mapOptions,
            mapTypeId: google.maps.MapTypeId.HYBRID,
          }}
          zoom={5}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.HYBRID}
          mapContainerStyle={{ width: "480px", height: "480px" }}
          onLoad={() => console.log("Map Component Loaded...")}
        >
          <MarkerF position={mapCenter} />
        </GoogleMap>
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
