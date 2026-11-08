import { API_URL } from "@/app/constants";
import { Product } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import FilteredCards from "./[id]/_components/FilteredCards";

const ProductsPage = async () => {
    const response = await fetch(`${API_URL}/products`, {
        headers: {
            ...(await authHeaders())
        },
        next: {
            tags: ["dashboard:products"]
        }
    })
    const products: Product[] = await response.json()
    return (<div>
        <FilteredCards products={products}/>
    </div>)
}

export default ProductsPage;