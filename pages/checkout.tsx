import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import Currency from "react-currency-formatter";
import CheckoutProduct from "../components/CheckoutProduct";
import { selectCartItems, selectCartTotal } from "../redux/slices/cartReducer";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Header from "../components/Header";
import { Stripe } from "stripe";
import { fetchPostJSON } from "../utils/api-helpers";
import getStripe from "../utils/get-strips";
import { toast, Toaster } from "react-hot-toast";

const Checkout: NextPage = () => {
  const items = useSelector(selectCartItems);
  const totalAmout = useSelector(selectCartTotal);
  const router = useRouter();

  const [groupedItemCart, setGroupedItemCart] = useState<{
    [key: string]: Product[];
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const groupedItem = items.reduce((result, item) => {
      (result[item._id] = result[item._id] || []).push(item);
      return result;
    }, {} as { [key: string]: Product[] });

    setGroupedItemCart(groupedItem);
  }, [items]);

  const checkOutHandler = async () => {
    setLoading(true);
    try {
      const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
        "/api/checkout_sessions",
        {
          items: items
        }
      );

      // Internal Server Error
      if ((checkoutSession as any).statusCode === 500) {
        toast.error((checkoutSession as any).message, {
          position: "bottom-center"
        });
        console.error((checkoutSession as any).message);
        return;
      }

      // Redirect to checkout
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: checkoutSession.id
      });

      toast.error(error.message as string, {
        position: "bottom-center"
      });

      console.warn(error);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#E7ECEE]">
      <Head>
        <title>Bag - Apple </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-5">
          <h1 className="my-2 text-2xl font-semibold lg:text-3xl">
            {items.length ? "Review your cart" : "Your cart is empty"}
          </h1>
          <p className="my-2">Free delivery and free returns</p>
          {!items.length && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          )}
        </div>

        {/* Object.entneries returns the array of key array of containing key value array pair */}
        {!!items.length && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemCart).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}

            <div className="my-10 mt-5 ml-auto max-w-2xl ">
              <div className="divide-y divide-gray-300">
                <div className="pb-4 text-sm">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity={totalAmout} currency="USD" />
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-x-1 lg:flex-row">
                      Estimated tax for
                      <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                        Enter zip code
                        <ChevronDownIcon className="h-4 w-6" />
                      </p>
                    </div>
                    <p>$ ~</p>
                  </div>
                </div>
                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <h4>Total</h4>
                  <h4>
                    <Currency quantity={totalAmout} currency="USD" />
                  </h4>
                </div>
              </div>

              <div className="my-12 flex flex-col space-y-4 text-sm font-semibold">
                <h4>How would you like to check out?</h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="order-2 flex flex-1 flex-col items-center rounded-lg bg-gray-200 p-8  text-center ">
                    <h4 className="mb-4 flex flex-col text-sm ">
                      <span>Pay Monthly </span>
                      <span>with Apple Card</span>
                      <span>
                        $283.16/mo. at 0% <sup className="-top-1">o</sup>
                      </span>
                    </h4>
                    <Button title="check Out with Apple Card Monthly Installements" />
                    <p className="mt-2 max-w-[240px] text-[13px] font-normal">
                      $0.00 due today, which includes applicable full-price
                      items, down payments, Shipping and taxes
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8  text-sm font-semibold md:order-2">
                <h4 className="mb-4 flex flex-col ">
                  Pay in full
                  <span>
                    <Currency quantity={totalAmout} currency="USD" />
                  </span>
                </h4>
                <Button
                  noIcon
                  title="Check Out"
                  width="w-full"
                  onClick={checkOutHandler}
                />
              </div>
            </div>
          </div>
        )}
      </main>
      <Toaster />
    </div>
  );
};

export default Checkout;
