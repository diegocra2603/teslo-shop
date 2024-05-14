export const revalidate = 60;
import { Pagination, Title } from "@/components";
import { ProductGrid } from '../../components/products/product-grid/ProductGrid';
import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  searchParams:{
    page?: string;
  }
}

export default async function HomePage({ searchParams } : Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if(products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={products} 
      />

      <Pagination totalPages={totalPages} />

    </>
  );
}
