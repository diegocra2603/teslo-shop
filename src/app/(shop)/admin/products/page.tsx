import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductsTable, Title } from '@/components';
import Link from 'next/link';

import { redirect } from 'next/navigation';

interface Props {
    searchParams: {
        page?: string;
    }
}

export default async function ProductsPage({ searchParams } : Props) {

    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, totalPages } = await getPaginatedProductsWithImages({ page });

    if (products.length === 0) {
        redirect('/');
    }

    return (
        <>
            <Title title="Mantenimiento de Productos" />

            <div className="flex justify-end mb-5">
                <Link href="/admin/product/new" className="btn-primary">
                    Nuevo Producto
                </Link>
            </div>

            <ProductsTable products={products} />

            <Pagination totalPages={totalPages} />
        </>
    );
}