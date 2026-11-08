import { API_URL } from "@/app/constants"
import { authHeaders } from "@/helpers/authHeaders"
import ProductCard from "./_components/ProductCard"
import UpdateProduct from "./_components/UpdateProduct"
import { Provider } from "@/entities"
import DeleteProviderButton from "../../providers/_components/DeleteProvider"
import DeleteProductButton from "./_components/DeleteProduct"

export default async function ProductPage({params}: {params: {
    id: string
}}){
    const response = await fetch(`${API_URL}/products/${params.id}`, {
        headers: {
            ...(await authHeaders())
        },
        next:{
            tags: [`dashboard:produts:${params.id}`]
        }
    })
    const product = await response.json()
    
    const responseProviders = await fetch(`${API_URL}/providers`, {
        headers: {
            ...(await authHeaders())
        },
    })
    const providers: Provider[] = await responseProviders.json()

    return(
        <div className="flex flex-col gap-6 w-full p-6">
            <ProductCard product={product}/>
            <UpdateProduct product={product} providers={providers}/>
            <DeleteProductButton productId={product.productId}/>
        </div>
    )
}