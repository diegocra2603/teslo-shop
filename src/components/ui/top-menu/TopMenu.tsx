'use client';
import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import Image from "next/image";

export const TopMenu = () => {

    const openMenu = useUIStore(state => state.openSideMenu);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])


    return (
        <nav className="flex px-5 justify-between items-center w-full">
            {/* Logo */}
            <div>
                <Link
                    href="/">
                    <Image src="/imgs/logo.png" alt="Logo" width={100} height={100} />
                </Link>
            </div>

            {/* Center Menu */}
            <div className="hidden sm:block">
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">Flowers</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">Gifts</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="https://studio4.cielitogrill.com/" target="_blank" >Dinners</Link>
                {/* <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">Niños</Link> */}
            </div>

            {/* Search, Cart, Menu */}
            <div className="flex items-center">
                <Link href="/search" className="mx-2">
                    <IoSearchOutline className="w-5 h5" />
                </Link>

                <Link href={
                    (totalItemsInCart === 0 && loaded )  ? "/empty" : "/cart"
                    } className="mx-2">
                    <div className="relative">
                        {
                            (loaded && totalItemsInCart > 0) && (
                                <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">{totalItemsInCart}</span>
                            )
                        }
                        <IoCartOutline className="w-5 h5" />
                    </div>
                </Link>

                <button
                    onClick={() => openMenu()}
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
                    Ménu
                </button>

            </div>

        </nav>
    )
}
