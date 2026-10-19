
import EmployeesLocation from "./@locations/_components/EmployeesLocation";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const store =
    typeof params.store === "string" ? params.store : "";

  return (
    <div className="w-full min-w-0">
      {store ? (
        <EmployeesLocation store={store} />
      ) : (
        <p className="py-2 text-center text-2xl">
          Selecciona una tienda para ver los empleados
        </p>
      )}
    </div>
  );
}
