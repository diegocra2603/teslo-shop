'use server';

import prisma from "@/lib/prisma";

export const SetTransactionId = async(orderId:string, transactionId: string) => {

    try {
        
        await prisma.order.update({
            where: {
                id : orderId
            },
            data: {
                transactionId: transactionId
            }
        })

        return {
            ok : true,
            message: 'Dato almacenado correctamente'
        }

    } catch (error) {
        console.log(error);
        return {
            ok : false,
            message: 'Error no esperado'
        }
    }

}