import BirthdayTable from "@/components/BirthdayTable";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import React from "react";

export default function Home() {
  return (
    <div className="container pb-5 pt-10  ">
      <Hero />
      <BirthdayTable />
      <Footer />
    </div>
  );
}
