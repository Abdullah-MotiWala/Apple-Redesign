import React, { FC } from "react";
import MultiTab from "./MultiTab";

interface Props {
  categories: Category[];
}

const NewPromos: FC<Props> = ({ categories }) => {
  return (
    <div className="space-y-10 py-16">
      <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
        New Promos
      </h1>
      <MultiTab categories={categories} />
    </div>
  );
};

export default NewPromos;
