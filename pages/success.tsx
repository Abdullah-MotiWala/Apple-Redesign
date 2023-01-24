import { CheckIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Currency from "react-currency-formatter";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Button from "../components/Button";
import { fetchedLineItems } from "../utils/fetchedLineItems";
import { useSession } from "next-auth/react";
// Interfaces
interface Props {
  products: StripeProduct[];
}

const Success: NextPage<Props> = ({ products }) => {
  const { data: session } = useSession();
  // States
  const [mounted, setMounted] = useState<Boolean>(false);
  const [showOrderSummary, setShowOrderSummary] = useState<Boolean>(false);

  //   Effects
  useEffect(() => {
    setMounted(true);
  }, []);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width : 1024px)" });
  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

  const subTotal = products.reduce((total, item) => {
    return total + item.price.unit_amount / 100;
  }, 0);

  const {
    query: { session_id },
    push
  } = useRouter();
  return (
    <div>
      <Head>
        <title>Thank You - Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="mx-auto max-w-xl">
        <Link href={"/"}>
          <div className="md: relative ml-4 h-16 w-8 cursor-pointer transition lg:hidden">
            <Image
              src="https://rb.gy/vsvv2o"
              alt="apple logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-9">
        <section className="order-2 mx-auto max-w-xl pb-12 md:pr-6 lg:col-span-5 lg:max-w-none lg:pr-6 lg:pt-6 xl:pl-10 2xl:pl-44">
          <Link href={"/"}>
            <div className="relative ml-1 hidden h-16 w-16 cursor-pointer transition lg:inline-flex">
              <Image
                src="https://rb.gy/vsvv2o"
                alt="apple logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <div className="my-6 ml-3 flex items-center space-x-2 lg:ml-14 xl:ml-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black">
              <CheckIcon />
            </div>
            <div className="">
              <p className="text-sm text-gray-600">
                Order #{session_id?.slice(-5)}
              </p>
              <h4 className="text-lg">
                Thank You{" "}
                {session ? session?.user?.name?.split(" ")[0] : "Guest"}
              </h4>
            </div>
          </div>

          <div className="mx-4 divide-y divide-gray-300 rounded-md border border-gray-300 p-4 lg:ml-14">
            <div className="space-y-2 pb-3">
              <p>Your order is confirmed</p>
              <p className="text-sm text-gray-600">
                We&apos;ve accepted your order and we&apos;re getting it
                ready. Come back to this page for the update on your shipment
                status
              </p>
            </div>
            <div className="pt-2 text-sm ">
              <p className="font-medium text-gray-600">Other tracking number</p>
              <p className="">CNB21441622</p>
            </div>
          </div>

          <div className="rouded-md my-4 mx-4 space-y-4 rounded-md border border-gray-300 p-4 lg:ml-14">
            <p className="">Other Updates</p>
            <p className="text-sm text-gray-600">
              You&apos;ll get shipping and delivery updates by text and email
            </p>
          </div>

          <div className="mx-4 flex flex-col items-center justify-between text-sm lg:ml-14 lg:flex-row ">
            <p className="hidden lg:inline">Need Help? Contact us</p>
            {mounted && (
              <Button
                title="Continue Shopping"
                width={isTabletOrMobile ? "w-full" : undefined}
                padding="py-4"
                onClick={() => push("/")}
              />
            )}
          </div>
        </section>
        {mounted && (
          <section className="border-1 overflow-y-scroll border-y border-gray-300 bg-[#FAFAFA] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div
              className={`w-full ${
                showOrderSummaryCondition && "border-b"
              } border-gray-300 text-sm lg:hidden`}
            >
              <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-2">
                <button
                  className="flex items-center space-x-2"
                  onClick={() => setShowOrderSummary(!showOrderSummary)}
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <p>Show order summary</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>

                <p className="font-sm text-xl text-black">
                  <Currency quantity={subTotal + 20} currency="USD" />
                </p>
              </div>
            </div>

            {showOrderSummaryCondition && (
              <div className="mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16">
                <div className="space-y-4 pb-4">
                  {products.map((item) => (
                    <div
                      key={item.id as string}
                      className="font-small flex items-center space-x-4 text-sm"
                    >
                      <div className="text-md relative flex h-12 w-12 items-center justify-center rounded-md border border-gray-300 bg-[#F1F1F1] text-white">
                        <div className="relative h-5 w-5 animate-bounce">
                          <Image
                            src="https://rb.gy/vsvv2o"
                            alt="apple logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[gray] text-xs font-semibold">
                          {item.quantity}
                        </div>
                      </div>
                      <p className="flex-1">{item.description}</p>
                      <p>
                        <Currency
                          quantity={item.price.unit_amount / 100}
                          currency={item.currency}
                        />
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1 py-4">
                  <div className="flex justify-between text-sm ">
                    <p className="text-[gray]">Subtotal</p>
                    <p className="font-small ">
                      <Currency quantity={subTotal} />
                    </p>
                  </div>{" "}
                  <div className="flex justify-between text-sm ">
                    <p className="text-[gray]">Discount</p>
                    <p className="font-small ">-</p>
                  </div>{" "}
                  <div className="flex justify-between text-sm ">
                    <p className="text-[gray]">shipping</p>
                    <p className="font-small ">
                      <Currency quantity={20} currency="USD" />
                    </p>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <p>Total </p>
                  <p className="flex items-center gap-x-2 text-xs text-[gray]">
                    USD
                    <span className="text-lg font-medium text-black">
                      <Currency quantity={subTotal + 20} />
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query
}) => {
  const sessionId = query.session_id as string;
  const productDetails = await fetchedLineItems(sessionId);
  return {
    props: { products: productDetails }
  };
};
