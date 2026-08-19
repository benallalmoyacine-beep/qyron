import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-page/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="display text-xl tracking-[0.18em] transition-opacity duration-200 hover:opacity-70"
        >
          QYRON
        </Link>
        <span className="tag text-dim">[ Impression 3D — Algérie ]</span>
      </div>
    </header>
  );
}
