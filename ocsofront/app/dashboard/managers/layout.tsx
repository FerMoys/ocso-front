import ManagerCard from "./_components/ManagerCard";

export default function ManagersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row items-start gap-6 w-full p-6">
            {/* Contenedor izquierdo: Lista fija de todos los managers */}
            <div className="w-1/2">
                <h2 className="text-xl font-bold mb-4">
                    Lista de managers
                </h2>
                <ManagerCard />
            </div>

            {/* Contenedor derecho: Vista dinámica del manager seleccionado */}
            <div className="w-1/2">
                <h2 className="text-xl font-bold mb-4">
                    Manager seleccionado
                </h2>
                {children}
            </div>
        </div>
    );
}