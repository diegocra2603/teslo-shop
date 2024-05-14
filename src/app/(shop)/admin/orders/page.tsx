import { getPaginatedOrders } from '@/actions';
import { OrdersTable, Pagination, Title } from '@/components';

import { redirect } from 'next/navigation';

interface Props {
    searchParams: {
        page?: string;
    }
}

export default async function OrdersPage({ searchParams } : Props) {

    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { orders, totalPages } = await getPaginatedOrders({ page });

    if (orders.length === 0) {
        redirect('/');
    }

    return (
        <>
            <Title title="Orders" />

            <OrdersTable orders={orders} />

            <Pagination totalPages={totalPages} />
        </>
    );
}