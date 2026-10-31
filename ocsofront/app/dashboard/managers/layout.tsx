import ManagerCard from "./_components/ManagerCard";

export default function ManagersLayout({
    children, count
}: {
    children: React.ReactNode, count: React.ReactNode;
}) {
    return (
        <div className="flex flex-row items-stretch gap-6 w-full p-6 min-h-[calc(100vh-5rem)]">

            <div className="w-96 shrink-0 overflow-y-auto max-h-[calc(100vh-8rem)] pr-2">
                <h2 className="text-xl font-bold mb-4">
                    Lista de managers
                </h2>

                <ManagerCard />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
                <h2 className="text-xl font-bold mb-4">
                    Manager seleccionado
                </h2>

                <div className="flex-1 min-w-0 gap-20">
                    {children} {count}
                </div>
            </div>

        </div>
    );
}