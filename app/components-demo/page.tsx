"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Drawer } from "@/components/ui/drawer";
import { Popover } from "@/components/ui/popover";
import { Tooltip } from "@/components/ui/tooltip";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Toast, ToastContainer } from "@/components/ui/toast";
import { Alert } from "@/components/ui/alert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Tabs } from "@/components/ui/tabs";
import { Accordion } from "@/components/ui/accordion";
import { Collapsible } from "@/components/ui/collapsible";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { Navbar } from "@/components/ui/navbar";
import { CommandPalette } from "@/components/ui/command-palette";
import { Table } from "@/components/ui/table";
import { ProgressBar } from "@/components/ui/progress-bar";
import { EmptyState } from "@/components/ui/empty-state";
import { Calendar } from "@/components/ui/calendar";
import { Package, Search } from "lucide-react";

export default function ComponentsDemo() {
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Toast state
  const [toasts, setToasts] = useState<Array<{ id: number; variant: "default" | "success" | "warning" | "destructive" }>>([]);
  
  // Alert Dialog state
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  
  // Command Palette state
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  
  // Calendar state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Command palette keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const addToast = (variant: "default" | "success" | "warning" | "destructive") => {
    const id = Date.now();
    setToasts([...toasts, { id, variant }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const commandItems = [
    { id: "1", label: "Search...", description: "Search through commands", shortcut: "⌘K", category: "General", onSelect: () => console.log("Search") },
    { id: "2", label: "Settings", description: "Open settings panel", shortcut: "⌘,", category: "General", onSelect: () => console.log("Settings") },
    { id: "3", label: "New File", description: "Create a new file", shortcut: "⌘N", category: "File", onSelect: () => console.log("New File") },
    { id: "4", label: "Save", description: "Save current file", shortcut: "⌘S", category: "File", onSelect: () => console.log("Save") },
    { id: "5", label: "Toggle Theme", description: "Switch between light and dark mode", shortcut: "⌘D", category: "View", onSelect: () => console.log("Toggle Theme") },
  ];

  const tableData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
    { id: 4, name: "Alice Williams", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "User", status: "Active" },
  ];

  const tableColumns = [
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "role", header: "Role", sortable: true },
    { key: "status", header: "Status", sortable: true },
  ];

  return (
    <div className="min-h-screen bg-(--background) p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Component Library Demo</h1>
        <p className="text-(--foreground/70) mb-8">Interactive examples of all UI components with game-ui-design principles</p>

        {/* Toast Container */}
        <ToastContainer>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              title="Notification"
              description="This is a sample notification message"
              variant={toast.variant}
              onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
            />
          ))}
        </ToastContainer>

        {/* Tier 3: Overlays & Feedback */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-(--caramel)">Tier 3:</span> Overlays & Feedback
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dialog */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Dialog/Modal</h3>
              <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
            </div>

            {/* Drawer */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Drawer/Sheet</h3>
              <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
            </div>

            {/* Popover */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Popover</h3>
              <Popover
                content={
                  <div>
                    <p className="font-medium">Popover Content</p>
                    <p className="text-sm text-(--foreground/70)">This is a popover content example</p>
                  </div>
                }
              >
                <Button>Click for Popover</Button>
              </Popover>
            </div>

            {/* Tooltip */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Tooltip</h3>
              <Tooltip content="This is a tooltip">
                <Button>Hover for Tooltip</Button>
              </Tooltip>
            </div>

            {/* Dropdown Menu */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Dropdown Menu</h3>
              <DropdownMenu
                trigger={<Button>Open Menu</Button>}
                items={[
                  { label: "Profile", onClick: () => console.log("Profile") },
                  { label: "Settings", onClick: () => console.log("Settings") },
                  { label: "Logout", destructive: true, onClick: () => console.log("Logout") },
                ]}
              />
            </div>

            {/* Toasts */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Toasts</h3>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" onClick={() => addToast("default")}>Default</Button>
                <Button variant="outline" onClick={() => addToast("success")}>Success</Button>
                <Button variant="outline" onClick={() => addToast("warning")}>Warning</Button>
                <Button variant="outline" onClick={() => addToast("destructive")}>Error</Button>
              </div>
            </div>

            {/* Alert */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Alert</h3>
              <Alert variant="info" title="Info Alert" description="This is an informational alert message" />
            </div>

            {/* Alert Dialog */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Alert Dialog</h3>
              <Button variant="destructive" onClick={() => setAlertDialogOpen(true)}>
                Show Alert Dialog
              </Button>
            </div>

            {/* Skeleton */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Skeleton</h3>
              <div className="space-y-3">
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="rectangular" height={100} />
              </div>
            </div>

            {/* Spinner */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Spinner</h3>
              <div className="flex gap-4 items-center">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Tier 4: Layout & Navigation */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-(--caramel)">Tier 4:</span> Layout & Navigation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tabs */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Tabs</h3>
              <Tabs
                tabs={[
                  { id: "tab1", label: "Overview", content: <div className="p-4">Overview content</div> },
                  { id: "tab2", label: "Details", content: <div className="p-4">Details content</div> },
                  { id: "tab3", label: "Settings", content: <div className="p-4">Settings content</div> },
                ]}
              />
            </div>

            {/* Accordion */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Accordion</h3>
              <Accordion
                items={[
                  { id: "item1", title: "Section 1", content: <div className="p-4">Content for section 1</div> },
                  { id: "item2", title: "Section 2", content: <div className="p-4">Content for section 2</div> },
                  { id: "item3", title: "Section 3", content: <div className="p-4">Content for section 3</div> },
                ]}
              />
            </div>

            {/* Collapsible */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Collapsible</h3>
              <Collapsible
                trigger="Click to expand"
                content={<div className="p-4">This content can be collapsed and expanded</div>}
              />
            </div>

            {/* Breadcrumb */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Breadcrumb</h3>
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Components", href: "/components" },
                  { label: "Demo", href: "/components/demo" },
                ]}
              />
            </div>

            {/* Pagination */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Pagination</h3>
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>

            {/* Navbar */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Navbar</h3>
              <Navbar
                logo={<div className="font-bold text-lg">Logo</div>}
                items={[
                  { label: "Home", href: "/", active: true },
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ]}
              />
            </div>

            {/* Command Palette Trigger */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Command Palette</h3>
              <Button onClick={() => setCommandPaletteOpen(true)}>
                <Search className="w-4 h-4 mr-2" />
                Open Command Palette (⌘K)
              </Button>
            </div>
          </div>
        </section>

        {/* Tier 5: Data Display */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-(--caramel)">Tier 5:</span> Data Display
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Table */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Table</h3>
              <Table columns={tableColumns} data={tableData} />
            </div>

            {/* Progress Bar */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Progress Bar</h3>
              <div className="space-y-4">
                <ProgressBar value={30} showLabel />
                <ProgressBar value={60} variant="success" showLabel />
                <ProgressBar value={85} variant="warning" showLabel />
                <ProgressBar value={95} variant="destructive" showLabel />
              </div>
            </div>

            {/* Empty State */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Empty State</h3>
              <EmptyState
                icon={<Package className="w-12 h-12" />}
                title="No items found"
                description="Get started by creating a new item or adjusting your search criteria."
                action={<Button>Create Item</Button>}
              />
            </div>

            {/* Calendar */}
            <div className="bg-(--surface-card) p-6 rounded-lg border border-(--border)">
              <h3 className="font-semibold mb-4">Calendar</h3>
              <Calendar
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </div>
          </div>
        </section>

        {/* Dialog Component */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Dialog Title"
          description="This is a dialog description that provides context for the dialog content."
        >
          <div className="space-y-4">
            <p>This is the dialog content area where you can place any components or information.</p>
            <p>Dialogs are great for focused user interactions and collecting information.</p>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
          </div>
        </Dialog>

        {/* Drawer Component */}
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Drawer Title"
          description="This is a drawer that slides in from the side."
          side="right"
        >
          <div className="space-y-4">
            <p>This is the drawer content area.</p>
            <p>Drawers are perfect for additional content without leaving the current context.</p>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button onClick={() => setDrawerOpen(false)}>Save</Button>
          </div>
        </Drawer>

        {/* Alert Dialog Component */}
        <AlertDialog
          open={alertDialogOpen}
          onClose={() => setAlertDialogOpen(false)}
          title="Are you sure?"
          description="This action cannot be undone. This will permanently delete your account and remove all your data."
          variant="destructive"
          confirmText="Delete Account"
          cancelText="Cancel"
          onConfirm={() => console.log("Confirmed")}
          showIcon
        />

        {/* Command Palette Component */}
        <CommandPalette
          open={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          items={commandItems}
          placeholder="Search commands..."
        />
      </div>
    </div>
  );
}