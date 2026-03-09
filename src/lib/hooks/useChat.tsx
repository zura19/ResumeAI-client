import { useQuery } from "@tanstack/react-query";
import { getChatService } from "../services/chat/getChatService";

export function useGetChat(id: string) {
  return useQuery({
    queryKey: ["chat", id],
    queryFn: async () => await getChatService(id),
  });
}
