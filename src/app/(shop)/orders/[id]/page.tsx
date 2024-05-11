import { getOrderById } from "@/actions";
import { Title } from "@/components";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  params: {
    id: string;
  }
}

export default async function OrderPage({ params }: Props) {

  const { id } = params;

  const { order, ok } = await getOrderById(id)

  if (!ok || order == null ) {
    notFound();
  }

  //Todo: verificar
  //Redirect

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Cart */}
          <div className="flex flex-col mt-5">

            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                'bg-red-500': !order.isPaid,
                'bg-green-700': order.isPaid
              }
              )
            }>
              <IoCardOutline size={30} />
              <span className="mx-2">Pagada</span>
            </div>

            {/* Items */}
            {
              order.OrderItem.map(({product,size, quantity}) => (
                <div key={`${product.slug}-${size}`} className="flex mb-5">
                  <Image
                    src={`/products/${product.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    alt={product.title}
                    className="mr-5 rounded"
                  />

                  <div>
                    <p>{product.title}</p>
                    <p>{currencyFormat(product.price)} x {quantity}</p>
                    <p className="font-bold">Subtotal: {currencyFormat(product.price * quantity)}</p>
                  </div>

                </div>
              ))
            }
          </div>

          {/* Resumen de order */}

          <div className="bg-white rounded-xl shadow-xl p-7 h">


            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            <div className="mb-10">
            <p className="text-xl">{order.OrderAddress?.firstName} {order.OrderAddress?.lastName}</p>
                <p>{order.OrderAddress?.address}</p>
                <p>{order.OrderAddress?.address2}</p>
                <p>{order.OrderAddress?.postalCode}</p>
                <p>{order.OrderAddress?.city}, {order.OrderAddress?.country.name}</p>
                <p>{order.OrderAddress?.phone}</p>
            </div>

            {/* Divider */}

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de Orden</h2>
            <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">{order.OrderItem.length === 1 ? '1 artículo' : `${order.OrderItem.length} artículos`} </span>

                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(order.subTotal)}</span>

                <span>Impuestos (15%)</span>
                <span className="text-right">{currencyFormat(order.tax)}</span>

                <span className="mt-5 text-2xl">Total:</span>
                <span className="mt-5 text-2xl text-right">{currencyFormat(order.total)}</span>
            </div>
            <div className="mt-5 mb-2 w-full">

              <div className={
                clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                    'bg-red-500': !order.isPaid,
                    'bg-green-700': order.isPaid
                }
                )
              }>
                <IoCardOutline size={30} />
                <span className="mx-2">Pagada</span>
              </div>

            </div>
          </div>


          {/* Checkout */}

        </div>

      </div>

    </div>
  );
}