import { Suspense } from "react";

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading game...</div>}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {children}
      </div>
    </Suspense>
  );
}
