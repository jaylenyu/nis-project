export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="Layout dark:bg-slate-800">
      <header className="flex justify-center items-center bg-white dark:bg-slate-600 h-20 text-4xl">
        🌏 NIS
      </header>
      <main>{children}</main>
      <footer className="flex justify-center items-center text-sm text-slate-500">
        © 2023 // All right reserved.
      </footer>
    </div>
  );
}
