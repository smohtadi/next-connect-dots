import { cn } from "@/lib/utils";

export default function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h1 className={cn("text-3xl font-bold text-primary", className)}>{children}</h1>;
}
