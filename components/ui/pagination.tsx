import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showEdges?: boolean;
  className?: string;
}

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  showEdges = true,
  className 
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5; // Number of page buttons to show

    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav 
      className={cn("flex items-center justify-center space-x-2", className)}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-2 rounded-lg border border-(--border)",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-(--ring)",
          // Touch target: minimum 32x32px
          "min-w-[32px] min-h-[32px]",
          currentPage === 1 
            ? "opacity-50 cursor-not-allowed" 
            : "hover:bg-(--surface-muted) cursor-pointer"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span 
              key={index} 
              className="px-3 py-2 text-(--foreground/40)"
              aria-hidden="true"
            >
              <MoreHorizontal className="w-4 h-4" />
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <button
            key={index}
            onClick={() => onPageChange(page as number)}
            className={cn(
              "px-3 py-2 rounded-lg border transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-(--ring)",
              // Touch target: minimum 32x32px
              "min-h-[32px]",
              isActive
                ? "bg-(--caramel) text-(--cream) border-(--caramel)"
                : "border-(--border) hover:bg-(--surface-muted)"
            )}
            aria-label={`Page ${page}`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-2 rounded-lg border border-(--border)",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-(--ring)",
          // Touch target: minimum 32x32px
          "min-w-[32px] min-h-[32px]",
          currentPage === totalPages 
            ? "opacity-50 cursor-not-allowed" 
            : "hover:bg-(--surface-muted) cursor-pointer"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

Pagination.displayName = "Pagination";