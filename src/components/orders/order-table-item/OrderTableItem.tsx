import { Order } from "@/interfaces"
import Link from "next/link"
import { IoCardOutline } from "react-icons/io5"

interface Props {
    order: Order
}

export const OrderTableItem = ({ order }: Props) => {
    return (
        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.id.split('-').at(-1)}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {
                    order.isPaid ? (
                        <>
                            <IoCardOutline className="text-green-800" />
                            <span className='mx-2 text-green-800'>Pagada</span>
                        </>
                    ) : (
                        <>
                            <IoCardOutline className="text-red-800" />
                            <span className='mx-2 text-red-800'>No pagada</span>
                        </>
                    )
                }

            </td>
            <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href={`/orders/${order.id}`} className="hover:underline">
                    Ver orden
                </Link>
            </td>

        </tr>
    )
}
