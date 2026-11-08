"use client";

import { Product } from "@/entities";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Input } from "@nextui-org/react";

export default function FilteredCards({ products }: { products: Product[] }) {
    const [filtered, setFiltered] = useState<string>("");
    const [productsList, setProductsList] = useState<Product[]>(products);

    useEffect(() => {
        const filteredProducts = products.filter((product) => {
            return product.productName.toLowerCase().includes(filtered.toLowerCase());
        });
        setProductsList(filteredProducts);
    }, [filtered, products]);

    return (
        <div className="w-full p-6 flex flex-col gap-6">
            {/* Barra de búsqueda centrada o alineada */}
            <div className="w-full max-w-md">
                <Input
                    isClearable
                    placeholder="Buscar producto por nombre..."
                    value={filtered}
                    onChange={(e) => setFiltered(e.target.value)}
                    classNames={{
                        inputWrapper: "border-default-200 hover:border-[#FFB336] focus-within:!border-[#F74C39] shadow-sm",
                    }}
                />
            </div>

            {/* Cuadrícula de 3 columnas (tamaño aprox 4/12 por tarjeta) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {productsList.length > 0 ? (
                    productsList.map((product) => (
                        <Link 
                            key={product.productId} 
                            href={{ pathname: `/dashboard/products/${product.productId}` }}
                            className="block transition-transform duration-300 ease-in-out hover:scale-105"
                        >
                            <ProductCard product={product} />
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full font-medium">
                        No se encontraron productos con ese nombre.
                    </p>
                )}
            </div>
        </div>
    );
}