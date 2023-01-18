import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { FC } from "react";
import { urlfor } from "../sanity";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartReducer";
import { toast } from "react-hot-toast";

const CheckoutProduct: FC<{ items: Product[]; id: string }> = ({
  items,
  id
}) => {
  const dispatch = useDispatch();
  const removeItemFromCart = () => {
    dispatch(removeFromCart({ id }));

    toast.error(`${items[0].title} removed from basket`, {
      position: "bottom-center"
    });
  };
  return (
    <div className="flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center lg:p-10">
      <div className="relative h-44 w-[9rem] text-start">
        <Image
          src={urlfor(items[0].image[0]).url()}
          alt={`${items[0].title}`}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96">{items[0].title}</h4>
            <p className="flex items-end gap-x-1 text-sm font-semibold">
              {items.length}
              <ChevronDownIcon className="h-4 w-4 text-blue-500" />
            </p>
          </div>

          <p className="flex cursor-pointer items-end text-sm text-blue-500 hover:underline">
            Show product details
            <ChevronDownIcon className="h-4 w-4 text-blue-500" />
          </p>
        </div>

        <div className="flex flex-col items-end space-y-4">
          <h4 className="text-lg font-semibold lg:text-xl">
            <Currency
              quantity={items.reduce((total, item) => {
                return total + item.price;
              }, 0)}
              currency="USD"
            />
          </h4>
          <button
            onClick={removeItemFromCart}
            className="text-xs text-blue-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
