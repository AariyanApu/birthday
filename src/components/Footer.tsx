import Link from "next/link";

export default function Footer() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-y-1  text-xs text-gray-500 lg:items-end lg:justify-end">
      <p className="">
        No copyrights,{" "}
        <Link
          className="animation_all hover:text-rose-600"
          href={"https://github.com/aariyanapu/birthday"}
        >
          Code is Open Source
        </Link>
      </p>
      <p className="">
        Design And Develped By{" "}
        <Link
          href="https://aariyanapu.com"
          className="animation_all hover:text-rose-600"
        >
          Aariyan Apu
        </Link>
      </p>
    </div>
  );
}
