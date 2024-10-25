
"use client";
import React from "react";
import Link from "next/link";
import Button from "@/lib/utils/Button";
import useSticky from "@/lib/hooks/useSticky";
import PollsList from "./PollList";
import { useAuthStore } from "@/lib/Store";


const Dashboard = () => {
    const isSticky = useSticky();
    const { isLoggedIn ,username} = useAuthStore();
  return (
    <div className="flex flex-col items-center ">
      <div className={`flex z-[999999] justify-around pt-3 font-mono sticky w-full  text-white transition-all duration-150 ease-linear ${
        isSticky
        ? "top-0 pb-3 bg-gray-900" : "top-3 mb-3"
      }`}>
        <h1 className="font-semibold text-2xl ">Poll Application Dashboard</h1>
        <div className="flex gap-2 items-center">
        {!isLoggedIn ? (
            <>
              <Link href="/pages/registeration">
                <Button label="Register" className="px-3 py-2" />
              </Link>
              <Link href="/pages/login">
                <Button label="Login" className="px-4 py-2" />
              </Link>
            </>
          ) : (
            <>
            <span className="text-xl">Hey, {username ? username : "Guest"}!</span>
            <Link href="/pages/polls/manage_polls">
                <Button label="My Polls" className="px-4 py-2 " />
              </Link>
            </>
          )}
        </div>
      </div>
      <Link href="/pages/polls">
        <Button label="Create a new form" className="mt-8"/>
      </Link>
      <PollsList/>
    </div>
  );
};

export default Dashboard;
