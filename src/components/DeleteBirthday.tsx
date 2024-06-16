"use client";

import React from "react";
import useSWR from "swr";
import { FaRegCircleXmark } from "react-icons/fa6";
import { signIn, useSession } from "next-auth/react";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "./ui/table";
import { birthdayDataProps } from "@/types/types";
import { Toaster } from "./ui/toaster";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function DeleteBirthday() {
  const fetcher = (url: RequestInfo, init?: RequestInit) =>
    fetch(url, init).then((res) => res.json());

  const {
    data,
    mutate,
  }: {
    data: birthdayDataProps[];
    error: any;
    isLoading: boolean;
    mutate: any;
  } = useSWR("/api/posts", fetcher);

  const deletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        // setDeleteMessage(result.message)
      } else {
        const errorResult = await response.json();
        console.error("Error deleting post:", errorResult);
        // setDeleteMessage('Error deleting post')
      }
      mutate();
      toast({
        title: "Birthday Deleted",
        description: "You have successfully deleted a birthday.",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const { data: session } = useSession();

  return session ? (
    <div className="container mx-auto  pb-10 pt-20">
      <div className="pb-4 text-center text-3xl">Delete Birthday</div>

      <Table className="mx-auto w-full px-4 md:w-72 md:px-0">
        <TableHeader>
          <TableRow>
            <TableHead className="w-100px">Name</TableHead>
            <TableHead className="w-100px">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((birthday) => (
            <TableRow
              className="animation_all rounded-md bg-slate-50 odd:bg-slate-100 hover:bg-slate-200"
              key={birthday.id}
            >
              <TableCell className="w-52 text-left">{birthday.name}</TableCell>
              <TableCell>
                <FaRegCircleXmark
                  size={20}
                  className="animation_all  transform cursor-pointer text-red-500  hover:scale-110 hover:text-red-700"
                  onClick={() => deletePost(birthday.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Toaster />
    </div>
  ) : (
    <div className="my-10">
      <div className=" text-balance text-center text-3xl font-bold">
        Log in with Your google account, to get access to all the features.
      </div>
      <Button
        variant="default"
        className={cn(
          session ? "hidden" : "block",
          "animation_all  mx-auto mt-5 w-32 rounded bg-rose-500 shadow hover:cursor-pointer hover:bg-rose-600",
        )}
        onClick={() => signIn()}
      >
        Sign In
      </Button>
    </div>
  );
}
