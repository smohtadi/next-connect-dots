"use server";
const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL="http://localhost:4000";

export async function createRoom(): Promise<string> {
  const res = await fetch(`${API_URL}/api/create-room`, { method: "POST" });
  const data = await res.json();
  console.log(data);
  return data.roomId;
}
