import Image from "next/image";
import React, { FC } from "react";
import Button from "./Button";

const Landing: FC = () => {
  return (
    <section className="sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8">
      <div className="space-y-8">
        <h1 className="space-y-3 text-3xl font-semibold tracking-wide lg:text-4xl xl:text-6xl">
          <span className="gradientComponent block bg-clip-text text-transparent">
            Powered
          </span>
          <span className="block">By Intellect</span>
          <span className="block">Driven By Values</span>
        </h1>
        <div className="space-x-8">
          <Button title="Buy Now"/>
          <a href="" className="link">
            Learn More{" "}
          </a>
        </div>
      </div>
      <div className="lg:[h-650px] hidden relative h-[450px] w-[450px] transition-all duration-500 md:inline lg:w-[600px] ">
        <Image
          src="/iphone.png"
          alt="iphone image"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default Landing;
