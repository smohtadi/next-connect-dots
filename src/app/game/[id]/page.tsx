import { redirect } from "next/navigation";
import Game from "@/components/game/game";

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return redirect("/");
  return (
    <div className="mx-auto py-8 px-4 md:w-4xl lg:w-6xl">
      <Game roomId={id} />
    </div>
  );
}
