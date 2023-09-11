import Image from "next/image";
import { useRouter } from "next/router";
import { CountryProps } from "@/types/components";
import styled from "styled-components";

export default function CountryItem({
  code,
  flagImg,
  flagEmoji,
  commonName,
  region,
  capital,
  population,
}: CountryProps) {
  const router = useRouter();
  const onClickItem = () => {
    router.push(`/country/${code}`);
  };

  return (
    <CountryItemContainer onClick={onClickItem} key={code}>
      <div className="h-1/2 relative">
        <Image
          src={flagImg}
          fill
          sizes="lx"
          alt="nation flag"
          className="h-1/2 w-full rounded-t-lg"
          priority={false}
        />
      </div>
      <div className="flex flex-col h-1/2 p-4 text-base">
        <div className="pb-2 font-bold">
          {flagEmoji} {commonName}
        </div>
        <div>
          <div>reg. : {region}</div>
          <div className="truncate">cap. : {capital}</div>
          <div>pop. : {population.toLocaleString()}</div>
        </div>
      </div>
    </CountryItemContainer>
  );
}

const CountryItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 20rem;
  width: 15rem;
  justify-content: center;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 150ms ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;
