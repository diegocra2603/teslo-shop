'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number;
}

export const getPaginatedUsers = async ({
    page = 1,
    take = 12
}: PaginationOptions) => {

    const session = await auth();

    if(session?.user.role !== 'admin') {
        return {
            ok: false,
            users: [],
            totalPages: 0
        }
    }

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    if (isNaN(Number(take))) take = 12;
    if (take < 1) take = 1;

    try {
        // 1, Obtener los Usuarios
        const promises = prisma.user.findMany({
            take,
            skip: (page - 1) * take,
            orderBy: {
                name: 'asc'
            }
        })

        // 2. Obtener el total de paginas
        const totalCountPromise = prisma.user.count()

        const [users, totalCount] = await Promise.all([promises, totalCountPromise])

        const totalPages = Math.ceil(totalCount / take);

        return {
            currentPage: page,
            totalPages,
            users: users
        }

    } catch (error) {
        throw new Error("No se pudo cargar lo solicitado");
    }

}