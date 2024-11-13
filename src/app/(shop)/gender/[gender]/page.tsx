export const revalidate = 60;
import { notFound, redirect } from "next/navigation";
import { ProductGrid } from '../../../../components/products/product-grid/ProductGrid';
import { Pagination, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { Category } from "@/interfaces";
import { Gender } from "@prisma/client";


interface Props {
  params: {
    gender: Gender;
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


  const labels: Record<Gender, string> = {
    'men': 'Flores / Arreglos',
    'women': 'Regalos',
    'kid': 'para Niños',
    'unisex': 'para Todos'
  }

  if (!labels[gender]) {
    notFound();
  }

  return (
    <>
      <Title
        title={`${labels[gender]}`}
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