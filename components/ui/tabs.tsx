import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface TabProps {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabProps[];
  defaultTab?: string;
  className?: string;
}

export const Tabs = ({ tabs, defaultTab, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Headers */}
      <div 
        className="flex border-b border-(--border)"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            disabled={tab.disabled}
            className={cn(
              "px-4 py-3 text-sm font-medium transition-colors duration-150",
              "relative border-b-2",
              "focus:outline-none focus:ring-2 focus:ring-(--ring) focus:ring-offset-2",
              // Touch target: minimum 44px height
              "min-h-[44px]",
              tab.disabled && "opacity-50 cursor-not-allowed",
              !tab.disabled && "cursor-pointer",
              activeTab === tab.id
                ? "border-(--caramel) text-(--foreground)"
                : "border-transparent text-(--foreground/60) hover:text-(--foreground) hover:bg-(--surface-muted)"
            )}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div 
        className="mt-4"
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTabData?.content}
      </div>
    </div>
  );
};

Tabs.displayName = "Tabs";