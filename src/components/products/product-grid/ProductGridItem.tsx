'use client'
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { Product } from "@/interfaces"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    const [displayImage, setDisplayImage] = useState(product.images[0]);

    const handlerMouseEnter = () => {
        setDisplayImage(product.images[1])
    }

    const handlerMouseLeave = () => {
        setDisplayImage(product.images[0])
    }

    return (
        <div className="rounded-md overflow-hidden fade-in">
            <Link href={`/product/${product.slug}`} >
                {/* <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className="w-full object-over rounded shadow-md"
                    width={500}
                    height={500}
                    onMouseEnter={handlerMouseEnter}
                    onMouseLeave={handlerMouseLeave}
                /> */}
                <ProductImage
                    src={displayImage}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="w-full object-over rounded shadow-md"
                    onMouseEnter={handlerMouseEnter}
                    onMouseLeave={handlerMouseLeave}
                />
            </Link>

            <div className="p-4 flex flex-col">
                <Link
                    className="hover:text-blue-600"
                    href={`/product/${product.slug}`}
                >
                    {product.title}
                </Link>
                <span className="font-bold">${product.price}</span>
            </div>
        </div>
    )
}
