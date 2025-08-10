"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Timer({
  start,
  onComplete,
}: {
  start: number;
  onComplete?: () => void;
}) {
  const [time, setTime] = useState(start);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (time < 1) return;
    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <span
      className={cn("text-2xl font-bold text-green-500 animate-pulse", {
        "text-destructive": time <= 9,
      })}
    >
      {time}s
    </span>
  );
}
