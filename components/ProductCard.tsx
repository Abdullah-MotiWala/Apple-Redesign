import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { FC } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartReducer";
import { urlfor } from "../sanity";

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();
  // FUNCTIONS
  const addItemToCart = () => {
    dispatch(addToCart(product));
    notify();
  };

  const notify = () => {
    toast.success(`${product.title} added to cart`, {
      position: "bottom-center"
    });
  };

  return (
    <div className="h-30 flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#35383C] p-8 md:h-[350px] md:w-[250px] md:p-10">
      <div className="relative h-64 w-full md:h-72">
        <Image
          src={urlfor(product.image[0]).url()}
          alt={`${product.title} image`}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="space-y-2 text-xl text-white md:text-2xl">
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>
        <div
          className="gradientComponent flex h-14 w-14 flex-shrink-0 cursor-pointer items-center justify-center rounded-full md:h-[50px] md:w-[50px]"
          onClick={addItemToCart}
        >
          <ShoppingCartIcon className="h-8 w-8 text-white" />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductCard;
