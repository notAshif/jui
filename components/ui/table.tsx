import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export type TableRowData = Record<string, unknown>;

export interface TableColumn<T extends TableRowData = TableRowData> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<T extends TableRowData = TableRowData> {
  columns: TableColumn<T>[];
  data: T[];
  sortable?: boolean;
  className?: string;
}

type SortDirection = "asc" | "desc" | null;

export const Table = <T extends TableRowData = TableRowData>({
  columns,
  data,
  sortable = true,
  className,
}: TableProps<T>) => {
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
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      const comparison = String(aValue) < String(bValue) ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection]);

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return sortable ? <ChevronsUpDown className="w-4 h-4 opacity-40" /> : null;
    }

    if (sortDirection === "asc") {
      return <ChevronUp className="w-4 h-4" />;
    }

    if (sortDirection === "desc") {
      return <ChevronDown className="w-4 h-4" />;
    }

    return null;
  };

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-(--border)">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-4 py-3 text-left text-sm font-semibold",
                  "transition-colors duration-150",
                  column.sortable && sortable && "cursor-pointer hover:bg-(--surface-muted)",
                  // Touch target: minimum 44px height
                  "min-h-11"
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
                  className="px-4 py-3 text-sm"
                >
                  {column.render ? column.render(row[column.key], row) : (row[column.key] as React.ReactNode)}
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

Table.displayName = "Table";