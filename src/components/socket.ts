"use client";
import { io } from "socket.io-client";
const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;
export const socket = io(API_URL, {
  forceNew: false,
  transports: ["websocket"],
});
