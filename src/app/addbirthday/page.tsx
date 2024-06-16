import AddBirthday from "@/components/AddBirthday";
import DeleteBirthday from "@/components/DeleteBirthday";
import { Toaster } from "@/components/ui/toaster";

export default function page() {
  return (
    <div className="container mx-auto my-10">
      <AddBirthday />
      <DeleteBirthday />
      <Toaster />
    </div>
  );
}
