import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { TableColumn, TableProps } from "@/components/ui/table";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

type SortDirection = "asc" | "desc" | null;

export const PixelTable = ({ columns, data, sortable = true, className }: TableProps) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    if (sortColumn === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection]);

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return sortable ? <ChevronsUpDown className="w-3 h-3 opacity-40" /> : null;
    }

    if (sortDirection === "asc") {
      return <ChevronUp className="w-3 h-3" />;
    }

    if (sortDirection === "desc") {
      return <ChevronDown className="w-3 h-3" />;
    }

    return null;
  };

  return (
    <div className={cn("w-full overflow-x-auto font-pixel", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-(--border-strong)">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-4 py-3 text-left text-xs font-semibold",
                  "transition-colors duration-150",
                  "tracking-wider",
                  column.sortable && sortable && "cursor-pointer hover:bg-(--surface-muted)",
                  "min-h-[44px]"
                )}
                onClick={() => column.sortable && handleSort(column.key)}
                aria-sort={
                  sortColumn === column.key
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {getSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-(--border) hover:bg-(--surface-muted) transition-colors duration-150"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-3 text-xs tracking-wide"
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {sortedData.length === 0 && (
        <div className="text-center py-8 text-(--foreground/60)">
          No data available
        </div>
      )}
    </div>
  );
};

PixelTable.displayName = "PixelTable";