import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t-4 border-(--espresso) bg-(--surface-card) py-6 sm:py-8 mt-auto font-pixel select-none">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7B5B49]">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-(--espresso) text-(--cream) pixel-border-bevel text-[10px] font-bold uppercase tracking-wider">
            CREDITS
          </span>
          <span className="tracking-wider">
            BUILT BY{" "}
            <Link
              href="https://github.com/notAshif"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--espresso) hover:text-(--caramel) uppercase font-bold underline underline-offset-2 decoration-dashed focus-visible:outline-none"
            >
              [ASIF]
            </Link>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] tracking-wider">
          <span>SOURCE CODE:</span>
          <Link
            href="https://github.com/notAshif/jui"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 bg-(--surface-muted) text-(--espresso) pixel-border-bevel hover:bg-(--caramel) hover:text-(--cream) uppercase font-bold focus-visible:outline-none"
          >
            [GITHUB REPOSITORY]
          </Link>
        </div>
      </div>
    </footer>
  );
}
