import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-page/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-[0.2em] transition-opacity duration-200 hover:opacity-60"
        >
          QYRON
        </Link>
        <span className="ml-4 hidden text-sm text-muted sm:block">Impression 3D</span>
      </div>
    </header>
  );
}
