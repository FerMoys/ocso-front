"use client";

import { Product, Provider } from "@/entities";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Input, Divider, Select, SelectItem } from "@nextui-org/react";

export default function FilteredCards({
    products,
    providers,
    children,
}: {
    products: Product[];
    providers: Provider[];
    children: React.ReactNode;
}) {
    const [filtered, setFiltered] = useState<string>("");
    const [provider, setProvider] = useState<string>("");
    const [productsList, setProductsList] = useState<Product[]>(products);

    useEffect(() => {
        const filteredProducts = products.filter((product) => {
            const matchesName = product.productName
                .toLowerCase()
                .includes(filtered.toLowerCase());

            const matchesProvider = provider
                ? product.provider?.providerId === provider
                : true;

            return matchesName && matchesProvider;
        });

        setProductsList(filteredProducts);
    }, [filtered, provider, products]);

    return (
        <div className="flex flex-row items-stretch w-full min-h-[calc(100vh-5rem)]">
            {/* Columna Izquierda: Buscador + Filtro + Lista con Scroll */}
            <div className="w-96 shrink-0 flex flex-col gap-4 p-6 border-r border-default-200 max-h-[calc(100vh-5rem)] overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-800">Lista de productos</h2>

                <Select
                    label="Proveedor"
                    placeholder="Todos los proveedores"
                    selectedKeys={provider ? [provider] : []}
                    onChange={(e) => setProvider(e.target.value)}
                    classNames={{
                        trigger: "border-default-200 hover:border-[#FFB336] shadow-sm",
                    }}
                >
                    {providers.map((p) => (
                        <SelectItem key={p.providerId}>
                            {p.providerName}
                        </SelectItem>
                    ))}
                </Select>

                <Input
                    isClearable
                    placeholder="Buscar producto..."
                    value={filtered}
                    onChange={(e) => setFiltered(e.target.value)}
                    onClear={() => setFiltered("")}
                    classNames={{
                        inputWrapper:
                            "border-default-200 hover:border-[#FFB336] focus-within:!border-[#F74C39] shadow-sm",
                    }}
                />

                <Divider className="my-1" />

                <div className="flex flex-col gap-4 pr-1">
                    {productsList.length > 0 ? (
                        productsList.map((product) => (
                            <Link
                                key={product.productId}
                                href={{ pathname: `/dashboard/products/${product.productId}` }}
                                className="block transition-transform duration-300 ease-in-out hover:scale-102"
                            >
                                <ProductCard product={product} />
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm font-medium text-center py-4">
                            No se encontraron productos.
                        </p>
                    )}
                </div>
            </div>

            {/* Columna Derecha: Renderiza el children (vista principal / form de creación / detalle) */}
            <div className="flex-1 min-w-0 p-6">
                {children}
            </div>
        </div>
    );
}