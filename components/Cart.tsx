import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../redux/slices/cartReducer";

const Cart = () => {
  const items = useSelector(selectCartItems);
  const cartTotals = useSelector(selectCartTotal);

  if (!items.length) return null;

  return (
    <Link href={"/checkout"}>
      <div className="fixed bottom-10 right-10 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gray-300">
        {items.length && (
          <span className="gradientComponent absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white">
            {items.length}
          </span>
        )}
        <ShoppingBagIcon className="headerLink h-7 w-7" />
      </div>
    </Link>
  );
};

export default Cart;
