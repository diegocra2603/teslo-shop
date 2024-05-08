'use server';
import prisma from "@/lib/prisma";

export const deleteUserAddres = async (userId: string) => {

    try {

        const addressStore = await prisma.userAddress.findUnique({ where: { userId } })

        if (addressStore) {
            await prisma.userAddress.delete({
                where: {
                    id: addressStore.id
                }
            })
        }

        return {
            ok: true,
            message: 'Eliminado correctamente'
        }

    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: 'Error al eliminar'
        }

    }

}