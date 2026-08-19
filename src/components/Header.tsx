import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-line bg-page">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <Link href="/" className="text-xl font-semibold tracking-widest">
          QYRON
        </Link>
      </div>
    </header>
  );
}
