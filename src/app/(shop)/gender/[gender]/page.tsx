export const revalidate = 60;
import { notFound, redirect } from "next/navigation";
import { ProductGrid } from '../../../../components/products/product-grid/ProductGrid';
import { Pagination, Title } from "@/components";
import { Category } from '../../../../interfaces/product.interface';
import { getPaginatedProductsWithImages } from "@/actions";


interface Props {
  params: {
    gender: Category;
  }
  searchParams: {
    page?: string;
  }
}

export default async function GenderPage({ params, searchParams }: Props) {

  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }


  const labels: Record<Category, string> = {
    'men': 'para Hombres',
    'women': 'para Mujeres',
    'kid': 'para Niños',
    'unisex': 'para Todos'
  }

  if (!labels[gender]) {
    notFound();
  }

  return (
    <>
      <Title
        title={`Artículos ${labels[gender]}`}
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