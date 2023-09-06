export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="Layout">
      <header>🌏 NIS</header>
      <main className="Layout">{children}</main>
    </div>
  );
}
