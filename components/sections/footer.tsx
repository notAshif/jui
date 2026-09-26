import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-dashed border-(--border-strong) py-6 sm:py-8 mt-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center text-sm text-[#7B5B49]">
        Built by{" "}
        <Link
          href="https://github.com/notAshif"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-(--espresso) hover:text-(--caramel) underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) rounded px-1"
        >
          Asif
        </Link>{" "}
        and the source code is available on{" "}
        <Link
          href="https://github.com/notAshif/jui"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-(--espresso) hover:text-(--caramel) underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) rounded px-1"
        >
          GitHub
        </Link>
        .
      </div>
    </footer>
  );
}
