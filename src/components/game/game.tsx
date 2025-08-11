"use client";
import { useState } from "react";
import useGame from "@/hooks/use-game";
import Board from "@/components/game/board";
import ScoreBoard from "@/components/game/score-board";
import Title from "@/components/ui/title";
import Subtitle from "@/components/ui/subtitle";
import ErrorBanner from "@/components/ui/error-banner";
import Loader from "@/components/ui/loader";
import type { IRoom } from "@/types";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Game({ roomId }: { roomId: string }) {
  const { room, error, player, move, skipTurn, leaveRoom } = useGame(roomId);
  const [timerKey, setTimerKey] = useState<number>(0);

  const handleMove = (row: number, col: number, border: number) => {
    move(row, col, border);
    setTimerKey((p) => p + 1);
  };

  return (
    <article className="flex flex-col place-items-center py-4">
      <Title className="mb-4">Dots</Title>
      <div className="mb-4 flex items-center gap-3">
      <Subtitle>
        Welcome <span className="font-semibold">Player {player}</span>
      </Subtitle>
      <div>
      <Button variant="destructive" onClick={leaveRoom}>
        <LogOut size={12} />
        Leave
      </Button>
      </div>
      </div>
      <ErrorBanner message={error} className="mt-2" />
      <Play
        room={room}
        player={player}
        timerKey={timerKey}
        skipTurn={skipTurn}
        leaveRoom={leaveRoom}
        handleMove={handleMove}
      />
    </article>
  );
}

function Play({
  room,
  player,
  timerKey,
  skipTurn,
  handleMove,
}: {
  room: IRoom | null;
  player: 1 | 2 | null;
  timerKey: number;
  skipTurn: () => void;
  leaveRoom: () => void;
  handleMove: (row: number, col: number, border: number) => void;
}) {
  if (!room || !player) return <Loader message="Connecting. Please wait..." />;
  return (
    <div className="animate-fade-in">
      <ScoreBoard
        player={player}
        room={room}
        timerKey={timerKey}
        onTimeUp={skipTurn}
      />
      <Board room={room} player={player} onMove={handleMove} />
    </div>
  );
}
