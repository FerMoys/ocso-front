import { API_URL } from "@/app/constants";
import { Product, Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import FilteredCards from "./[id]/_components/FilteredCards";
import FormCreateProduct from "./[id]/_components/FormCreateProduct";

export default async function LayoutProducts({
    children,
}: {
    children: React.ReactNode;
}) {
    const responseProducts = await fetch(`${API_URL}/products`, {
        headers: {
            ...(await authHeaders()),
        },
        next: {
            tags: ["dashboard:products"],
        },
    });
    const products: Product[] = await responseProducts.json();

    const responseProviders = await fetch(`${API_URL}/providers`, {
        headers: {
            ...(await authHeaders()),
        },
        next: {
            tags: ["dashboard:providers"],
        },
    });
    const providers: Provider[] = await responseProviders.json();

    return (
        <FilteredCards products={products} providers={providers}>
            {children}
        </FilteredCards>
    );
}