'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRol = async (userId: string, rol: string) => {

    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado como admin'
        }
    }

    try {

        const newRole = rol === 'admin' ? 'admin' : 'user';

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: newRole
            }
        })

        revalidatePath('/admin/users');
        
        return {
            ok: true,
            message: 'Actualización realizada correctamente'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo actualizar el rol, revisar logs'
        }
    }

}