import { cn } from "@/lib/utils";

export default function Subtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("text-lg", className)}>{children}</p>;
}
