
"use client";
import React from "react";
import Link from "next/link";
import Button from "@/lib/utils/Button";
import useSticky from "@/lib/hooks/useSticky";

const Dashboard = () => {
    const isSticky = useSticky();
  return (
    <div className="flex flex-col items-center">
      <div className={`flex  justify-around pt-3 font-mono sticky w-full bg-[#5cbf80] transition-all duration-150 ease-linear ${
        isSticky
        ? "top-0 " : "top-3 mb-3"
      }`}>
        <h1 className="font-semibold text-2xl ">Poll Application Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/pages/registeration">
            <Button label="Register" className="px-3 py-2"/>
          </Link>
          <Link href="/pages/login">
            <Button label="Login" className="px-4 py-2"/>
          </Link>
        </div>
      </div>
      <Link href="/pages/polls">
        <Button label="Create a new form" className="mt-8"/>
      </Link>
    </div>
  );
};

export default Dashboard;
