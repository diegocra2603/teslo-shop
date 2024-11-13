'use client';
import { QuantitySelector, SizeSelector } from '@/components';
import { type CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    product: Product;
}
export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);

    const [size, setSize] = useState<Size | undefined>(product.sizes[0]);
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);

    const addToCart = () => {
        setPosted(true);

        if (!size) return;

        // console.log({ size, quantity, product});

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: product.sizes[0],
            image: product.images[0]
        }

        toast.success('Producto agregado al carrito');

        addProductToCart(cartProduct)
        setPosted(false);
        setQuantity(1);
    }

    return (
        <>
            <Toaster />
            {
                posted && !size && (
                    <span className="mt-2 text-red-500">
                        Debe de seleccionar una talla*
                    </span>
                )
            }

            {/* Selector de tallas */}
            {/* <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setSize}
            /> */}
            {/* Selector de cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />
            {/* Button */}
            <button
                onClick={addToCart}
                className="btn-primary my-5">
                Agregar al carrito
            </button>
        </>
    )
}
