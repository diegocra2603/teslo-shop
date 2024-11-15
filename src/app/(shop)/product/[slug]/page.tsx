export const revalidate = 604800; //7 dias
import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";
import { currencyFormat } from "@/utils";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = params.slug

  const product = await getProductBySlug(slug)

  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto',
    description: product?.description ?? 'Descripcion',
    openGraph: {
      title: product?.title ?? 'Producto',
      description: product?.description ?? 'Descripcion',
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductBySlugPage({ params }: Props) {

  const { slug } = params
  const product = await getProductBySlug(slug);
  console.log(product);
  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">

        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />


      </div>

      {/* Detalles */}
      <div className="cols-span-1 px-5 ">

        <StockLabel slug={slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">{currencyFormat(product.price)}</p>

        <AddToCart product={product}  />

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          {product.description}
        </p>

      </div>
    </div>
  );
}