import { io } from "socket.io-client";
const API: string = import.meta.env.VITE_API_URL;
export const socket = io(API.split("/api")[0]);
