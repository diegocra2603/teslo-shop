'use server';
import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
    try {

        const newAddress = await createOrReplaceAddress(userId, address);

        return {
            ok: true,
            address: newAddress,
            message: 'entidad grabada'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo grabar la dirección',
            address: null
        }
    }
}


const createOrReplaceAddress = async (userId: string, address: Address) => {

    try {

        const storedAddress = await prisma.userAddress.findUnique({
            where: {
                userId
            }
        })

        const addressToSave = {
            userId: userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
            city: address.city
        }

        if (!storedAddress) {
            return await prisma.userAddress.create({
                data: addressToSave
            })
        }

        return await prisma.userAddress.update({
            where: { id: storedAddress.id },
            data: addressToSave
        })

    } catch (error) {
        console.log(error);
        throw new Error('No se pudo grabar la direccion')
    }

}