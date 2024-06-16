"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function Hero() {
  const { data: session } = useSession();
  return (
    <div className="mb-16 mt-10">
      <div className="text-balance text-center text-4xl  font-bold  text-gray-900 sm:text-5xl md:text-6xl">
        Effortlessly Track and Celebrate Your{" "}
        <span className="text-rose-500">Loved Ones&apos; Birthdays</span>
      </div>
      <div className="mx-auto w-full text-balance py-3 text-center text-gray-500 sm:w-2/3 md:text-xl ">
        Whether you&apos;re at home or on the go, access your curated
        celebration hub anytime, anywhere, ensuring no special moment slips by
        unnoticed.
      </div>
      <div className="mt-5 flex items-center justify-center gap-x-3 ">
        <Button
          variant="default"
          className={cn(
            session ? "hidden" : "block",
            " animation_all w-32  rounded bg-rose-500 shadow hover:cursor-pointer hover:bg-rose-600",
          )}
          onClick={() => signIn()}
        >
          Sign In
        </Button>
        <Button
          className="animation_all  rounded shadow hover:cursor-pointer hover:bg-gray-200"
          variant="outline"
        >
          <Link href="/addbirthday">Add Birthday</Link>
        </Button>
      </div>
    </div>
  );
}
