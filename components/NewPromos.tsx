import React, { FC } from "react";
import MultiTab from "./MultiTab";

interface Props {
  categories: Category[];
  products: Product[];
}

const NewPromos: FC<Props> = ({ categories, products }) => {
  return (
    <div className="space-y-6 py-8 ">
      <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
        New Promos
      </h1>
      <MultiTab categories={categories} products={products} />
    </div>
  );
};

export default NewPromos;
