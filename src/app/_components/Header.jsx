"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { data } = useSession();
  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <Image src="/logo.svg" alt="logo" width={80} height={50} />
        <div className="md:flex hidden items-center gap-6">
          <Link href={"/"} className="hover:scale-105 cursor-pointer hover:text-primary">
            Home
          </Link>
          <h2 className="hover:scale-105 cursor-pointer hover:text-primary">
            Services
          </h2>
          <h2 className="hover:scale-105 cursor-pointer hover:text-primary">
            About Us
          </h2>
        </div>
      </div>
      {data?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src={data?.user?.image}
              alt="user Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/mybooking"}> My Booking </Link>
              
              </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>signOut()} >Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => signIn("descope")}>Login / Signup</Button>
      )}
    </div>
  );
};

export default Header;
