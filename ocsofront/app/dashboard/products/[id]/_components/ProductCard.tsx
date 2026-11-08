'use client';

import { Product } from "@/entities";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
    const router = useRouter();

    // Extraemos de forma segura el ID y nombre del proveedor por si viene como objeto o string
    const providerId = 
        typeof product.provider === 'object' && product.provider !== null
            ? (product.provider as any).providerId
            : product.provider;

    const providerName = 
        typeof product.provider === 'object' && product.provider !== null
            ? (product.provider as any).providerName
            : "Ver proveedor";

    const handleProviderClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evita que se active el Link contenedor de la tarjeta
        if (providerId) {
            router.push(`/dashboard/providers/${providerId}`);
        }
    };

    return (
        <Card className="w-full border-2 border-transparent hover:border-[#FFB336] transition-all shadow-md hover:shadow-xl bg-white cursor-pointer">
            <CardHeader className="bg-[#FFB336]/10 text-gray-800 font-semibold">
                {product.productName}
            </CardHeader>
            <Divider />
            <CardBody className="py-3 flex flex-col gap-1">
                <p className="text-sm text-gray-600">
                    Nombre del producto: <b>{product.productName}</b>
                </p>
                <p className="text-sm text-gray-600">
                    Precio del producto: <b>${product.price}</b>
                </p>
                <p className="text-sm text-gray-600">
                    Proveedor:{" "}
                    <span 
                        onClick={handleProviderClick}
                        className="text-[#F74C39] font-medium hover:underline cursor-pointer"
                    >
                        {providerName}
                    </span>
                </p>
            </CardBody>
        </Card>
    );
}