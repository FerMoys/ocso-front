import { Product, Provider } from "@/entities";
import updateProduct from "@/actions/products/update";
import { Input, Button } from "@nextui-org/react";
import ProviderSelect from "./ProviderSelect";

export default function UpdateProduct({ product, providers }: { product: Product, providers: Provider[] }) {
    const { productId } = product;
    const updateProductById = updateProduct.bind(null, productId);

    // Extraemos el ID del proveedor de manera robusta por si llega como objeto o string
    const currentProviderId = 
        typeof product.provider === 'object' && product.provider !== null
            ? (product.provider as any).providerId
            : product.provider;

    return (
        <form action={updateProductById} className="flex flex-col gap-4 max-w-md bg-white p-6 rounded-lg shadow-md border border-default-200">
            <h3 className="text-xl font-bold text-gray-800">Actualizar Producto</h3>

            <Input 
                name="productName" 
                label="Nombre del producto" 
                defaultValue={product.productName} 
                isRequired
                size="sm"
            />
            
            <Input 
                name="countSeal" 
                label="Num. de Sellos" 
                type="number"
                defaultValue={String(product.countSeal)} 
                isRequired
                size="sm"
            />
            
            <Input 
                name="price" 
                label="Precio" 
                type="number"
                step="0.01"
                defaultValue={String(product.price)} 
                isRequired
                size="sm"
            />
            
            {/* Componente independiente para evitar errores de colecciones en NextUI */}
            <ProviderSelect providers={providers} defaultProviderId={currentProviderId} />

            <Button 
                color="primary" 
                type="submit"
                className=" text-white font-semibold mt-2"
            >
                Actualizar Producto
            </Button>
        </form>
    );
}