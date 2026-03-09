import { useMutation, useQuery } from "@tanstack/react-query";
import { getChatService } from "../services/chat/getChatService";
import { sendMessageService } from "../services/chat/sendMessageService";

export function useGetChat(id: string) {
  return useQuery({
    queryKey: ["chat", id],
    queryFn: async () => await getChatService(id),
  });
}

export function useSendMessage(
  resumeId: string,
  { onError, onSuccess }: { onSuccess: () => void; onError: () => void },
) {
  return useMutation({
    mutationFn: async (message: string) =>
      await sendMessageService(resumeId, message),
    onSuccess: onSuccess,
    onError: onError,
  });
}
