import { DashboardGuard } from "@/components/dashboard/dashboardGuard";
import { DashboardSidebar } from "@/components/dashboard/dashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardGuard>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <aside className="md:w-64 md:shrink-0 md:sticky md:top-20 md:self-start">
            <DashboardSidebar />
          </aside>
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </DashboardGuard>
  );
}
