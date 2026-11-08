'use client';

import { useState } from "react";
import { Provider } from "@/entities";
import { Input, Button, Select, SelectItem, Card, CardBody, CardHeader } from "@nextui-org/react";
import createProduct from "@/actions/products/create";

export default function FormCreateProduct({ providers }: { providers: Provider[] }) {
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            await createProduct(formData);
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error("Error al crear el producto:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-xl bg-white shadow-md border border-default-200">
            <CardHeader className="bg-[#FFB336]/10 border-b border-default-100">
                <h2 className="text-xl font-bold text-[#F74C39]">
                    Registrar Nuevo Producto
                </h2>
            </CardHeader>

            <CardBody className="p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="Nombre del Producto"
                        name="productName"
                        placeholder="Ej. Gansito"
                        isRequired
                        size="sm"
                        classNames={{
                            inputWrapper: "hover:border-[#FFB336] focus-within:!border-[#F74C39]",
                        }}
                    />

                    <Input
                        label="Precio"
                        name="price"
                        type="number"
                        step="0.01"
                        placeholder="20.50"
                        isRequired
                        size="sm"
                        classNames={{
                            inputWrapper: "hover:border-[#FFB336] focus-within:!border-[#F74C39]",
                        }}
                    />

                    <Input
                        label="Cantidad de sellos"
                        name="countSeal"
                        type="number"
                        placeholder="2"
                        isRequired
                        size="sm"
                        classNames={{
                            inputWrapper: "hover:border-[#FFB336] focus-within:!border-[#F74C39]",
                        }}
                    />

                    <Select
                        label="Proveedor"
                        name="provider"
                        placeholder="Selecciona un proveedor"
                        isRequired
                        size="sm"
                        classNames={{
                            trigger: "hover:border-[#FFB336]",
                        }}
                    >
                        {providers.map((provider) => (
                            <SelectItem key={provider.providerId} value={provider.providerId}>
                                {provider.providerName}
                            </SelectItem>
                        ))}
                    </Select>

                    <Button
                        type="submit"
                        isLoading={submitting}
                        className="bg-[#FFB336] hover:bg-[#F74C39] text-black hover:text-white font-bold transition-colors mt-2"
                    >
                        Guardar Producto
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}