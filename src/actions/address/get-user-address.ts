'use server';

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {

    try {
        const addrees =  await prisma.userAddress.findUnique({ where: { userId } })

        if (!addrees) return null

        const { countryId, address2, ...rest } = addrees;

        return {
            ...rest,
            country: addrees.countryId,
        }

    } catch (error) {
        console.log(error);
        return null
    }

}