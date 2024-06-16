"use client";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";

import useSWR from "swr";

import { useEffect, useState } from "react";
import { BirthdayData } from "@/types/types";
import Loading from "./Loading";

const BirthdayTable = () => {
  const [birthdayData, setBirthdayData] = useState<BirthdayData[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("birthdayData");
    if (storedData) {
      // Parse the stored data and ensure it's treated as an array
      const parsedData = JSON.parse(storedData);
      // Check if parsedData is indeed an array before setting it
      if (Array.isArray(parsedData)) {
        setBirthdayData(parsedData);
      } else {
        // If parsedData is not an array, you might want to handle this case,
        // e.g., by setting birthdayData to an empty array or logging an error
        console.error("Stored birthdayData is not an array.");
      }
    }
  }, []);

  const { data: session } = useSession();

  const fetcher = (url: RequestInfo, init?: RequestInit) =>
    fetch(url, init).then((res) => res.json());

  const {
    data: birthdayDataDb,
    error,
    isLoading,
  } = useSWR("/api/posts", fetcher);

  var data: BirthdayData[];

  session ? (data = birthdayDataDb) : (data = birthdayData);

  return isLoading ? (
    <Loading />
  ) : (
    <Table className=" mx-auto max-w-lg">
      <TableHeader>
        <TableRow className="text-xs md:text-base">
          <TableHead className="font-bold">Name</TableHead>
          <TableHead className="w-[10px] font-bold">Age</TableHead>
          <TableHead className=" w-[120px] font-bold md:w-[150px]">
            Birthday
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {// two map function is used to to map birthday
        data
          ?.map((b) => ({
            ...b,
            // add a custom days left elemet to show how many days left
            daysLeft:
              moment(b.date, "DD/MM").diff(moment(), "days") >= 0 // this turnary operator calculates the days is greater than 0 or not
                ? moment(b.date, "DD/MM").diff(moment(), "days") // if the number greater than 0 it will be the daysLeft
                : moment(b.date, "DD/MM") // if the number is less than 0 it will be added 1 year to the daysLeft
                    .add(1, "years")
                    .diff(moment(), "days"),
          }))
          .sort((a, b) => a.daysLeft - b.daysLeft) // sort function order the list
          ?.map((b) => {
            return (
              <TableRow
                key={b.name}
                className="animation_all rounded-md bg-slate-50 text-xs odd:bg-slate-100 hover:bg-slate-200 md:text-base"
              >
                <TableCell className=" font-medium">{b.name}</TableCell>
                <TableCell className="w-[10px]">
                  {moment().diff(moment(b.date, "DD/MM/YYYY"), "years")}
                </TableCell>
                <TableCell className="w-[120px] md:w-[150px]">
                  {moment(b.date, "DD/MM").endOf("day").fromNow()}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default BirthdayTable;
