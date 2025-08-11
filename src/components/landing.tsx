"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRoom } from "@/server/actions/game-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import ErrorBanner from "@/components/ui/error-banner";
import Image from "next/image";
const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;
export default function Landing() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const roomId = formData.get("room-id");
    if (roomId && typeof roomId === "string" && roomId.trim().length > 3) {
      router.push(`/game/${roomId}`);
      setError(null);
    } else {
      setError("Please enter a valid Room ID");
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch(`${API_URL}/api/create-room`, { method: "POST" });
      const data = await res.json();
      const roomId = data.roomId;
      if (roomId) router.push(`/game/${roomId}`);
    } catch (error) {
      console.error("Error creating room:", error);
      setError("Failed to create room");
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-xl shadow-lg animate-fade-in">
      <div className="flex justify-center items-center mb-4 gap-1">
      <Image
          src="/logo.png"
          width={54}
          height={54}
          alt="Dots logo"
        />
      <Title className="text-center">Dots</Title>
      </div>
      <p className="mb-6 text-sm">
        Enter a room id to join a room or create a new one by clicking
        Create Room
      </p>
      <div className="space-y-4">
        <ErrorBanner message={error} />
        <form
          onSubmit={handleSubmit}
          className="space-y-2 border-b-2 border-border mb-8 pb-6 pt-2 relative"
        >
          <Label htmlFor="room-id">Enter Room ID</Label>
          <div className="flex gap-1">
            <Input id="room-id" name="room-id" />
            <Button variant="outline" type="submit">
              Join
            </Button>
          </div>
          {/* Place OR in the middle of the bottom border */}
          <span className="absolute left-1/2 bottom-[-0.6rem] bg-background px-2">
            Or
          </span>
        </form>
        <Button variant="default" className="w-full" onClick={handleCreate}>
          Create Room
        </Button>
      </div>
    </div>
  );
}
