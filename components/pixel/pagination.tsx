import React from "react";
import { cn } from "@/lib/utils";
import { PaginationProps } from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export const PixelPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  showEdges = true,
  className 
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav 
      className={cn("flex items-center justify-center space-x-2 font-pixel", className)}
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-2 border-2 border-(--border-strong)",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-(--ring)",
          "min-w-[32px] min-h-[32px]",
          "text-xs",
          currentPage === 1 
            ? "opacity-50 cursor-not-allowed" 
            : "hover:bg-(--surface-muted) cursor-pointer"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-3 h-3" />
      </button>

      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span 
              key={index} 
              className="px-3 py-2 text-(--foreground/40)"
              aria-hidden="true"
            >
              <MoreHorizontal className="w-3 h-3" />
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={index}
            onClick={() => onPageChange(page as number)}
            className={cn(
              "px-3 py-2 border-2 transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-(--ring)",
              "min-h-[32px]",
              "text-xs tracking-wider",
              isActive
                ? "bg-(--caramel) text-(--cream) border-(--caramel)"
                : "border-(--border-strong) hover:bg-(--surface-muted)"
            )}
            aria-label={`Page ${page}`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-2 border-2 border-(--border-strong)",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-(--ring)",
          "min-w-[32px] min-h-[32px]",
          "text-xs",
          currentPage === totalPages 
            ? "opacity-50 cursor-not-allowed" 
            : "hover:bg-(--surface-muted) cursor-pointer"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-3 h-3" />
      </button>
    </nav>
  );
};

PixelPagination.displayName = "PixelPagination";