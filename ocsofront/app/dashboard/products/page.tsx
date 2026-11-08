import { API_URL } from "@/app/constants";
import { Provider } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import FormCreateProduct from "./[id]/_components/FormCreateProduct";

export default async function ProductsPage() {
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
        <div className="w-full flex flex-col items-center justify-center p-4">
            <FormCreateProduct providers={providers} />
        </div>
    );
}