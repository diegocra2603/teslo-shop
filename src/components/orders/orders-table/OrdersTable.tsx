import { Order } from "@/interfaces"
import { OrderTableItem } from "../order-table-item/OrderTableItem"

interface Props {
    orders: Order[]
}

export const OrdersTable = ({ orders }: Props) => {
    return (
        <div className="mb-10">
            <table className="min-w-full">
                <thead className="bg-gray-200 border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            #ID
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Nombre completo
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Estado
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Opciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order =>
                            <OrderTableItem key={order.id} order={order} />
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
