"use client";

import { useT } from "@/lib/langue";

export default function LienEvitement() {
  const t = useT();
  return (
    <a href="#contenu" className="tag evitement rounded-full bg-ink px-4 py-3 text-void">
      {t.allerAuContenu}
    </a>
  );
}
