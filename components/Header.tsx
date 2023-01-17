import Image from "next/image";
import React, { FunctionComponent, useState } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/slices/cartReducer";

const Header: FunctionComponent = () => {
  const [session, setSession] = useState<string>("");
  const items = useSelector(selectCartItems);
  return (
    <header className="sticky top-0 z-30 flex w-full justify-between bg-[#E7ECEE]  py-2 px-4">
      <div className="flex w-1/5 items-center justify-center">
        <div className="relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100">
          <Image
            src="https://rb.gy/vsvv2o"
            alt="company logo"
            //   objectFit="contain"
            width={20}
            height={20}
            // fill
          />
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a href="" className="headerLink">
          Product
        </a>
        <a href="" className="headerLink">
          Explore
        </a>
        <a href="" className="headerLink">
          Support
        </a>
        <a href="" className="headerLink">
          Business
        </a>
      </div>
      <div className="flex items-center justify-center space-x-6 md:w-1/5">
        <MagnifyingGlassIcon className="headerLink h-6 w-6" />
        <Link href={"/checkout"}>
          <div className="relative cursor-pointer">
            {!!items.length && (
              <span className="gradientComponent absolute -right-1 -top-1 z-50  flex h-4 w-4 items-center justify-center rounded-full text-xs text-[10px] text-white">
                {items.length}
              </span>
            )}
            <ShoppingBagIcon className="headerLink h-6 w-6" />
          </div>
        </Link>

        {session ? (
          <Image
            src={session.user.logo || "https://google.com"}
            alt="image"
            className="rounded-fulll cursor-pointer"
            width={34}
            height={34}
            // onClick={() => signOut()}
          />
        ) : (
          <UserIcon
            className="headerLink h-6 w-6"
            // onClick={()=>signIn()}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
