import { Timer } from "@/components/ui/timer";
import { PlayerScore } from "@/components/game/player-score";
import { IRoom } from "@/types";

export default function ScoreBoard({
  room,
  player,
  timerKey,
  onTimeUp,
}: {
  room: IRoom | null;
  player: 1 | 2 | null;
  timerKey: number;
  onTimeUp: () => void;
}) {
  if (!room || !player) return null;
  const { turn, player1, player2, score } = room;
  const showTimer = turn === player && !!(player1 && player2);
  return (
    <div className="flex justify-between items-center gap-8 mt-2 mb-8">
      <PlayerScore
        isActive={turn === 1}
        player={1}
        score={score[0]}
        isConnected={!!player1}
      />
      {showTimer && <Timer key={timerKey} start={20} onComplete={onTimeUp} />}
      <PlayerScore
        isActive={turn === 2}
        player={2}
        score={score[1]}
        isConnected={!!player2}
      />
    </div>
  );
}
