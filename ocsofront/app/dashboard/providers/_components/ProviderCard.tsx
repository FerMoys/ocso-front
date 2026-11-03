import { Provider } from "@/entities";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default async function ProviderCard({ provider }: { provider: Provider }) {
    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Usamos el Card directamente como Link usando la propiedad 'as' */}
            <Card
                as={Link}
                href={`/dashboard/providers/${provider.providerId}`}
                className="w-full border-2 border-transparent hover:border-[#F74C39] transition-all shadow-md hover:shadow-xl bg-white transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer text-inherit no-underline"
            >
                <CardHeader className="bg-[#FFB336]/10 text-gray-800 font-semibold">
                    <p className="w-full">
                        Nombre: <span className="text-[#F74C39]">{provider.providerName}</span>
                    </p>
                </CardHeader>

                <Divider />

                <CardBody className="py-3">
                    <p className="text-large text-gray-600 w-full">
                        Email: <b>{provider.providerEmail}</b>
                    </p>
                    <p className="text-large text-gray-600 w-full mt-1">
                        Teléfono: <b>{provider.providerPhoneNumber}</b>
                    </p>
                    {
                        provider.products ? (
                            <p className="mt-2 text-sm text-gray-500">
                                Tiene <b>{provider.products.length}</b> productos
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-gray-500">No tiene productos</p>
                        )
                    }
                </CardBody>
            </Card>
        </div>
    );
}