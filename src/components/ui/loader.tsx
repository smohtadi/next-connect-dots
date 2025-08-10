import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function Loader({
  message = "Loading...",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      role="status"
    >
      <LoaderCircle className="animate-spin" />
      <span>{message}</span>
    </div>
  );
}
