import Header from "./_components/Header";
import Sidebar from "./_components/_sidebar/Sidebar";

export default function LayoutDashboard({
  children,
  count
}: Readonly<{
  children: React.ReactNode;
  count: React.ReactNode;
}>) {
  return (
    <div className="h-dvh w-full bg-[#F74C39] flex flex-col overflow-hidden">
      <Header />

      <div className="flex flex-1 min-h-0 w-full">
        <Sidebar />

        <main className="flex-1 min-w-0 min-h-0 bg-white p-6 overflow-y-auto">
          {children}
          {count}
        </main>
      </div>
    </div>
  );
}
