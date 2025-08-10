import { cn } from "@/lib/utils";

export default function ErrorBanner({
  message,
  className,
}: {
  message?: string | null;
  className?: string;
}) {
  if (!message || typeof message !== "string" || message.trim().length === 0)
    return null;
  return (
    <p
      role="alert"
      className={cn(
        "bg-destructive/15 font-medium text-sm text-destructive p-2 rounded animate-pulse",
        className
      )}
    >
      {message}
    </p>
  );
}
