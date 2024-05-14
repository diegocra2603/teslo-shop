'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number;
}

export const getPaginatedOrders = async ({
    page = 1,
    take = 12
}: PaginationOptions) => {

    const session = await auth();

    if(session?.user.role !== 'admin') {
        return {
            ok: false,
            orders: [],
            totalPages: 0
        }
    }

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    if (isNaN(Number(take))) take = 12;
    if (take < 1) take = 1;

    try {
        // 1, Obtener las Ordenes
        const ordersPromise = prisma.order.findMany({
            take,
            skip: (page - 1) * take,
            include: {
                OrderAddress: {
                    select: {
                        firstName : true,
                        lastName: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        // 2. Obtener el total de paginas
        const totalCountPromise = prisma.order.count()

        const [orders, totalCount] = await Promise.all([ordersPromise, totalCountPromise])

        const totalPages = Math.ceil(totalCount / take);

        return {
            currentPage: page,
            totalPages,
            orders: orders
        }

    } catch (error) {
        throw new Error("No se pudo cargar los productos")
    }

}