import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { ProductGrid } from '../../../../components/products/product-grid/ProductGrid';
import { Title } from "@/components";
import { Category } from '../../../../interfaces/product.interface';

const seedProducts = initialData.products;

interface Props{
  params: {
      id : Category;
  }
}

export default function({ params } : Props) {

  const { id } = params;
  const products = seedProducts.filter(product => product.gender === id);

  const labels: Record<Category, string> = {
    'men': 'para Hombres',
    'women': 'para Mujeres',
    'kid':'para Niños',
    'unisex': 'para Todos'
  }

  if(!labels[id]) {
    notFound();
  }

  return (
    <>
      <Title
        title={`Artículos ${labels[id]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={products}
      />

    </>
  );
}