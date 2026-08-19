import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-void/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[100rem] items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="display inline-flex h-full items-center pr-4 text-xl leading-none tracking-[0.12em] transition-colors duration-200 hover:text-heat"
        >
          QYRON
        </Link>
        <span className="tag flex items-center gap-2 text-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-heat" aria-hidden="true" />
          Atelier ouvert
        </span>
      </div>
    </header>
  );
}
