'use server';

import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {

    const authToken = await getPaypalBearerToken();

    if (!authToken) {
        return {
            ok: false,
            message: 'No se pudo obtener el token de verificación'
        }
    }

    const resp = await verifyPaypalPayment(paypalTransactionId, authToken);

    if (!resp) {
        return {
            ok: false,
            message: 'Error al verificar el pago'
        }
    }

    const { status, purchase_units } = resp;
    const { invoice_id: orderId } = purchase_units[0];

    if (status !== 'COMPLETED') {
        return {
            ok: false,
            message: 'Aún no se ha pagado en Paypa;'
        }
    }

    try {

        console.log({ status, purchase_units });

        await prisma.order.update({
            where: { id: orderId },
            data: {
                isPaid: true,
                paidAt: new Date()
            }
        })

        revalidatePath(`/orders/${orderId}`);

        return {
            ok: true
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: '500 - El pago no se pudo realizar'
        }
    }

    //TODO Realiar la actualización en nuestra base de datos

}

const getPaypalBearerToken = async () => {

    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const oauth2url = process.env.PAYPAL_OAUTH_URL ?? '';

    const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${base64Token}`
        },
        body: new URLSearchParams({ grant_type: 'client_credentials' })
    };

    try {
        const result = await fetch(oauth2url, { ...options, cache: 'no-store' }).then(r => r.json());

        return result.access_token

    } catch (error) {
        console.log(error);
        return null;
    }

}

const verifyPaypalPayment = async (paypalTransactionId: string, bearerToken: string,): Promise<PaypalOrderStatusResponse | null> => {

    const paypalOrderUrl = process.env.PAYPAL_ORDERS_URL;

    const options = {
        method: 'GET',
        headers: {
            'User-Agent': 'insomnia/9.1.1',
            Authorization: `Bearer ${bearerToken}`
        }
    };

    try {
        return await fetch(`${paypalOrderUrl}/${paypalTransactionId}`, { ...options, cache: 'no-store' }).then(r => r.json());

    } catch (error: any) {
        return null;
    }


}