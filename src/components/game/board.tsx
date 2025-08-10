import Square from "@/components/game/square";
import { IRoom } from "@/types";

interface Props {
  room: IRoom;
  player: 1 | 2 | null;
  onMove: (row: number, col: number, border: number) => void;
}

export default function Board({ room, player, onMove }: Props) {
  const { board, scoreMap, player1, player2, turn } = room;
  return (
    <>
      <div className="w-fit mx-auto">
        {board.map((row, i) => (
          <div key={i} className="flex">
            {row.map((borders, j) => (
              <Square
                key={j}
                showTop={i === 0}
                showLeft={j === 0}
                text={
                  scoreMap[i][j] === 1
                    ? "P1"
                    : scoreMap[i][j] === 2
                    ? "P2"
                    : undefined
                }
                x={i}
                y={j}
                showRight
                showBottom
                disabled={turn !== player || !player1 || !player2}
                borders={borders}
                onClickBorder={onMove}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
