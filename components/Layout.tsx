import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const onClickHeader = () => {
    router.push("/");
  };

  return (
    <div className="Layout dark:bg-slate-800">
      <header className="flex justify-center items-center bg-white dark:bg-slate-600 h-20 text-4xl">
        <h1 className="hover:cursor-pointer" onClick={onClickHeader}>
          🌏 NIS
        </h1>
      </header>
      <main>{children}</main>
      <footer className="flex justify-center items-center h-40 text-sm text-slate-500">
        © 2023 YU JEONG IN All right reserved.
      </footer>
    </div>
  );
}
