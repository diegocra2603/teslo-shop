'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";


export const getOrderById = async (id: string) => {

    const session = await auth();

    if(!session?.user) {
        return {
            ok: false,
            order: null
        }
    }

    const where: any = {
        id: id
    }

    if(session.user.role !== 'admin') {
        where['userId'] = session?.user.id
    }

    try {
        const order = await prisma.order.findUnique({
            where,
            include: {
                OrderAddress: {
                    include : {
                        country: true
                    }
                },
                OrderItem: {
                    include: {
                        product: {
                            include : {
                                ProductImage: true
                            }
                        }
                    }
                }
            },
        })

        return {
            ok: true,
            order
        }

    } catch (error) {
        console.log(error);

        return {
            ok: false,
            order: null
        }
    }


}