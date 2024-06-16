import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function Loading() {
  const loop = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Table className="mx-auto max-w-lg">
      <TableHeader>
        <TableRow className="text-xs md:text-base">
          <TableHead className="font-bold">Name</TableHead>
          <TableHead className="w-[10px] font-bold">Age</TableHead>
          <TableHead className=" w-[120px] font-bold md:w-[150px]">
            Birthday
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="animate-pulse">
        {loop.map((i) => (
          <TableRow key={i} className=" bg-slate-50  odd:bg-slate-300  ">
            <TableCell className="py-6"></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
