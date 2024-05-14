import { Product, ProductImage } from "@/interfaces"
import { ProductTableItem } from "../product-table-item/ProductTableItem";

interface Props {
    products: any;
}

export const ProductsTable = ({ products } : Props) => {
    return (
        <div className="mb-10">
            <table className="min-w-full">
                <thead className="bg-gray-200 border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Imagen
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Titulo
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Precio
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Género
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Inventario
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Tallas
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product: any) =>
                            <ProductTableItem key={product.id} product={product} />
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
