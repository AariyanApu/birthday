"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "./ui/use-toast";
import { useSession } from "next-auth/react";

export default function AddBirthday() {
  interface BirthdayData {
    name: string;
    date: string;
  }
  const { data: session }: any = useSession();
  const [birthdayData, setBirthdayData] = useState<BirthdayData[]>([]);
  // Save Data to Local Storage
  useEffect(() => {
    const storedData = localStorage.getItem("birthdayData");
    const parsedData = storedData ? JSON.parse(storedData) : [];

    const allBirthdaysToSave = [...parsedData, ...birthdayData];
    localStorage.setItem("birthdayData", JSON.stringify(allBirthdaysToSave));
  }, [birthdayData]);

  const onSubmit = async (data: BirthdayData) => {
    session
      ? await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            date: data.date,
            userEmail: session?.user?.email,
          }),
        })
      : setBirthdayData((prevData) => [...prevData, data]);
    toast({
      title: "Birthday Added",
      description: "You have successfully added a birthday.",
    });

    // Reset newBirthday input fields
    reset();
  };

  const form = useForm({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BirthdayData>();

  return (
    <div className="flex items-center justify-center">
      <div className="">
        <div className="mb-4 text-center text-3xl">Add Birthday</div>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormLabel>Enter Your Name</FormLabel>
            <Input
              type="text"
              className="w-[280px]"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-sm text-red-500 ">
                This Field Is Required
              </span>
            )}

            <FormLabel>Enter Your Birthdate: DD/MM/YYYY</FormLabel>
            <Input
              type="text"
              className="w-[280px]"
              {...register("date", { required: true })}
            />
            {errors.date && (
              <span className="text-sm text-red-500 ">
                This Field Is Required
              </span>
            )}
            <Button
              variant={"outline"}
              type="submit"
              className="animation_all w-[280px] cursor-pointer rounded hover:bg-gray-100"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
