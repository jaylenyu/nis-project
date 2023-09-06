import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const code = "kr";

  const onMoveSeachPage = () => {
    router.push({
      pathname: "/country/[code]",
      query: { code: code },
    });
  };
  return (
    <div>
      home page
      <button className="flex bg-white text-black" onClick={onMoveSeachPage}>
        search page 이동
      </button>
      <Link href={"/search"}>Search Page 이동</Link>
      {/* <Link href={}>{code}</Link> */}
    </div>
  );
}
