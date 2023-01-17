import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import React, { FC, useState } from "react";
import { fetchCategories } from "../utils/fetchCategories";
import ProductCard from "./ProductCard";

interface Props {
  categories: Category[];
  products: Product[];
}

const MultiTab: FC<Props> = ({ categories, products }) => {
  const showProducts = (categoryNum: number) => {
    return products.filter(
      (item) => item.category._ref === categories[categoryNum]._id
    );
  };

  return (
    <Tab.Group>
      <Tab.List className="flex justify-center">
        {categories.map((category: any) => (
          <Tab
            key={category._id}
            id={category._id}
            className={({ selected }) =>
              `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base  ${
                selected
                  ? "borderGradient bg-[#35383C] text-white"
                  : "border-b-2 border-[#35383C] text-[#747474]"
              }`
            }
          >
            <p className="capitalize"> {category.title}</p>
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
        {categories.map((category, index) => (
          <Tab.Panel className="tabPanel" key={category._id}>
            {/* show product function will get the index number and filtered out the values of that category */}
            {showProducts(index).map((item: Product) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default MultiTab;
