import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Landing from "../components/Landing";
import NewPromos from "../components/NewPromos";
import { fetchCategories } from "../utils/fetchCategories";
import { GetServerSideProps, NextPage } from "next";
import { fetchProducts } from "../utils/fetchProducts";
import type { Session } from "next-auth";
import Cart from "../components/Cart";
import { getSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  categories: Category[];
  products: Product[];
  session: Session | null;
}

export default function Home({ categories, products }: Props) {
  return (
    <>
      <Head>
        <title>Apple Redesign</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Cart />
      <main className="relative h-[200vh] bg-[#E7ECEE] ">
        <Landing />
      </main>
      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1b1b1b]">
        <NewPromos categories={categories} products={products} />
      </section>
    </>
  );
}

// BE Code
export const getServerSideProps: GetServerSideProps<Props> = async (
  params: any
) => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const session = await getSession();

  return {
    props: {
      categories,
      products,
      session
    }
  };
};
