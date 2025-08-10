import { cn } from "@/lib/utils";

export function PlayerScore({
  isActive,
  player,
  score,
  isConnected,
}: {
  isActive: boolean;
  isConnected: boolean;
  player: 1 | 2;
  score: number;
}) {
  return (
    <span
      className={cn(
        { "text-teal-500": player === 1 },
        { "text-pink-500": player === 2 },
        { "font-bold": isActive },
        { "animate-pulse font-medium": !isConnected}
      )}
    >
      <span>Player {player}: {isConnected ? score : "Waiting..."}</span>
    </span>
  );
}
