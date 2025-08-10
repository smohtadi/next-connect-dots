import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/components/socket";
import { IRoom } from "@/types";

export default function useGame(roomId: string) {
  const [room, setRoom] = useState<IRoom | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [player, setPlayer] = useState<1 | 2 | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const existingPlayerId = localStorage.getItem("playerId");
    if (existingPlayerId) {
      setPlayerId(existingPlayerId);
    } else {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/create-player`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          setPlayerId(data.playerId);
          localStorage.setItem("playerId", data.playerId);
        });
    }
  }, []);

  useEffect(() => {
    if (!playerId || !roomId) return;
    if (!socket.connected) socket.connect();
    let joinAttempts = 0;
    const maxAttempts = 5;
    let hasJoined = false;
    const attemptJoin = () => {
      if (hasJoined || joinAttempts >= maxAttempts) return;
      const timeout = Math.pow(2, joinAttempts) * 1000;
      console.log(`Attempt ${joinAttempts}/${maxAttempts}`);
      const attemptTimeout = setTimeout(() => {
        if (!hasJoined) {
          joinAttempts++;
          if (joinAttempts < maxAttempts) {
            setTimeout(attemptJoin, timeout);
          } else {
            setError("Failed to join. Please try refreshing the page.");
          }
        }
      }, 5000);
      socket.emit(
        "join",
        { roomId, playerId },
        (response: { success: boolean; room?: IRoom; error?: string }) => {
          clearTimeout(attemptTimeout);
          if (response.success && response.room) {
            hasJoined = true;
            setRoom(response.room);
            setError(null);
            if (response.room.player1 === playerId) {
              setPlayer(1);
            } else if (response.room.player2 === playerId) {
              setPlayer(2);
            }
          } else {
            setError(response.error || "Unknown error occurred");
            if (
              response.error === "Room not found" ||
              response.error === "Room is full"
            ) {
              hasJoined = true;
            } else {
              joinAttempts++;
              if (joinAttempts < maxAttempts) {
                setTimeout(attemptJoin, timeout);
              }
            }
          }
        }
      );
    };
    attemptJoin();
    const handleUpdate = (updatedRoom: IRoom) => setRoom(updatedRoom);
    const handleError = (msg: string) => setError(msg);
    const handleLeave = () => router.replace("/");

    socket.on("update", handleUpdate);
    socket.on("error", handleError);
    socket.on("leave", handleLeave);

    return () => {
      socket.off("update", handleUpdate);
      socket.off("error", handleError);
      socket.off("leave", handleLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerId, roomId]);

  useEffect(() => {
    if (room && playerId) {
      if (room.player1 === playerId) setPlayer(1);
      else if (room.player2 === playerId) setPlayer(2);
      else setPlayer(null);
    }
  }, [room, playerId]);

  const move = useCallback(
    (row: number, col: number, border: number) => {
      if (!room || !player || room.turn !== player || room.winner) return;
      setRoom((prev) => {
        if (!prev) return null;
        const newBoard = [...prev.board];
        newBoard[row][col][border] = player;
        return { ...prev, board: newBoard };
      });
      socket.emit("move", { roomId, playerId, row, col, border });
    },
    [roomId, playerId, room, player]
  );

  const skipTurn = useCallback(() => {
    socket.emit("skip-turn", { roomId, playerId });
  }, [roomId, playerId]);

  const leaveRoom = useCallback(() => {
    socket.emit("leave-room", { roomId, playerId });
  }, [roomId, playerId]);

  return {
    room,
    error,
    player,
    playerId,
    move,
    skipTurn,
    leaveRoom,
  };
}
