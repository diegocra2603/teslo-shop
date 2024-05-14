export const revalidate = 0
import { getPaginatedUsers } from '@/actions';
import { Pagination, Title, UsersTable } from '@/components';
import { redirect } from 'next/navigation';

interface Props {
    searchParams: {
        page?: string;
    }
}

export default async function UsersPage({ searchParams } : Props) {

    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { users, totalPages } = await getPaginatedUsers({ page });

    if (users.length === 0) {
        redirect('/');
    }

    return (
        <>
            <Title title="Mantenimiento de Usuarios" />

            <UsersTable users={users} />

            <Pagination totalPages={totalPages} />
        </>
    );
}