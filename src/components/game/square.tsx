import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type BoxProps = {
  borders: number[];
  showBottom?: boolean;
  showLeft?: boolean;
  showRight?: boolean;
  showTop?: boolean;
  text?: string;
  x: number;
  y: number;
  disabled?: boolean;
  onClickBorder: (x: number, y: number, dir: number) => void;
};
export default function Square({
  borders,
  showBottom,
  showLeft,
  showRight,
  showTop,
  text,
  x,
  y,
  disabled = false,
  onClickBorder,
}: BoxProps) {
  return (
    <div
      className={cn("flex h-17 w-17 md:h-20 md:w-20 relative", {
        "border-border border-t-2": showTop,
        "border-border border-r-2": showRight,
        "border-border border-b-2": showBottom,
        "border-border border-l-2": showLeft,
      })}
    >
      {text && <span className="font-medium m-auto">{text}</span>}
      {showTop && showLeft && (
        <div className="bg-black rounded-full h-4 absolute w-4 z-10 top-[-0.5rem] left-[-0.5rem]"></div>
      )}
      {showTop && showRight && (
        <div className="bg-black rounded-full h-4 absolute w-4 z-10 top-[-0.5rem] right-[-0.5rem]"></div>
      )}
      {showBottom && showRight && (
        <div className="bg-black rounded-full h-4 absolute w-4 z-10 bottom-[-0.5rem] right-[-0.5rem]"></div>
      )}
      {showBottom && showLeft && (
        <div className="bg-black rounded-full h-4 absolute w-4 z-10 bottom-[-0.5rem] left-[-0.5rem]"></div>
      )}
      {showTop && (
        <Button
          className={cn(
            "bg-transparent border-0 absolute z-40 transition-all p-0 disabled:opacity-100",
            "h-4 w-[80%] my-0 mx-[10%]",
            "top-[-0.5rem]",
            {
              "bg-teal-500": borders[0] === 1,
              "bg-pink-500": borders[0] === 2,
            }
          )}
          disabled={borders[0] !== 0 || disabled}
          onClick={() => onClickBorder(x, y, 0)}
        ></Button>
      )}
      {showRight && (
        <Button
          className={cn(
            "bg-transparent border-0 absolute z-40 transition-all p-0 disabled:opacity-100",
            "h-[80%] w-4 my-[10%] mx-0",
            "right-[-0.5rem]",
            {
              "bg-teal-500": borders[1] === 1,
              "bg-pink-500": borders[1] === 2,
            }
          )}
          disabled={borders[1] !== 0 || disabled}
          onClick={() => onClickBorder(x, y, 1)}
        ></Button>
      )}
      {showBottom && (
        <Button
          className={cn(
            "bg-transparent border-0 absolute z-40 transition-all p-0 disabled:opacity-100",
            "h-4 w-[80%] my-0 mx-[10%]",
            "bottom-[-0.5rem]",
            {
              "bg-teal-500": borders[2] === 1,
              "bg-pink-500": borders[2] === 2,
            }
          )}
          disabled={borders[2] !== 0 || disabled}
          onClick={() => onClickBorder(x, y, 2)}
        ></Button>
      )}
      {showLeft && (
        <Button
          className={cn(
            "bg-transparent border-0 absolute z-40 transition-all p-0 disabled:opacity-100",
            "h-[80%] w-4 my-[10%] mx-0",
            "left-[-0.5rem]",
            {
              "bg-teal-500": borders[3] === 1,
              "bg-pink-500": borders[3] === 2,
            }
          )}
          disabled={borders[3] !== 0 || disabled}
          onClick={() => onClickBorder(x, y, 3)}
        ></Button>
      )}
    </div>
  );
}
