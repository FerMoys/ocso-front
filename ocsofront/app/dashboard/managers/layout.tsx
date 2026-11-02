import ManagerCard from "./_components/ManagerCard";

export default function ManagersLayout({
    children, 
    count
}: {
    children: React.ReactNode; 
    count: React.ReactNode;
}) {
    return (
        <div className="flex flex-row items-stretch gap-6 w-full p-6 min-h-[calc(100vh-5rem)]">
            {/* Columna Izquierda */}
            <div className="w-96 shrink-0 overflow-y-auto max-h-[calc(100vh-8rem)] pr-2 flex flex-col gap-4">
                <h2 className="text-xl font-bold">Lista de managers</h2>
                <ManagerCard />
                {/* Colocamos el slot de estadísticas aquí abajo */}
                {count}
            </div>

            {/* Columna Derecha */}
            <div className="flex-1 min-w-0 flex flex-col">
                <h2 className="text-xl font-bold mb-4">Manager seleccionado</h2>
                <div className="flex-1 min-w-0 flex flex-col gap-6">
                    {children}
                </div>
            </div>
        </div>
    );
}