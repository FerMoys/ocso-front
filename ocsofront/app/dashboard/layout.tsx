"use client";

import { usePathname } from "next/navigation";
import Header from "./_components/Header";
import Sidebar from "./_components/_sidebar/Sidebar";

export default function LayoutDashboard({
    children,
    locations,
}: Readonly<{
    children: React.ReactNode;
    locations: React.ReactNode;
}>) {
    const path = usePathname();

    return (
        <div className="flex h-dvh w-full flex-col overflow-hidden bg-[#F74C39]">
            <Header />

            <div className="flex min-h-0 w-full flex-1">
                <Sidebar />

                <main className="min-w-0 flex-1 overflow-y-auto bg-white p-6">

                    <div className="w-full min-w-0">
                        {children}

                        {path === "/dashboard" ? locations : null}
                    </div>

                </main>
            </div>
        </div>
    );
}