import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const onClickHeader = () => {
    router.push("/");
  };

  return (
    <div className="Layout dark:bg-slate-800">
      <header className="flex justify-center items-center fixed t-0 w-full z-50 shadow-md bg-white dark:bg-slate-600 h-24 text-4xl sm:text-3xl sx:text-2xl">
        <h1 className="hover:cursor-pointer" onClick={onClickHeader}>
          🌏 National Infomation System
        </h1>
      </header>
      <main className="pt-20">{children}</main>
      <footer className="flex justify-center items-center h-40 sm:h-20 sx:h-10 text-sm text-slate-500">
        © 2023 YU JEONG IN All right reserved.
      </footer>
    </div>
  );
}
