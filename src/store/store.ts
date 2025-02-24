import { ChatState } from "@/types";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream.mjs";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useChatStore = create<ChatState>()(
  devtools((set) => ({
    status: "idle",
    question: "",
    answer: "",
    messages: [],
    setQuestion: (question) => set({ question }),
    resetChat: () =>
      set({ status: "idle", question: "", answer: "", messages: [] }),
    handleSubmitQuestion: async (e) => {
      e.preventDefault();
      set({ status: "pending" });
      const { question } = useChatStore.getState();

      try {
        const res = await fetch("/api/answer", {
          method: "POST",
          body: JSON.stringify({ question }),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        if (!res.body) return;

        ChatCompletionStream.fromReadableStream(res.body)
          .on("content", (delta) =>
            set((state) => ({ answer: state.answer + delta })),
          )
          .on("end", () => set({ status: "done" }));
      } catch (error) {
        console.error("Error handling question:", error);
        set({ status: "error" });
      }
    },
    handleSubmitChat: async (e) => {
      e.preventDefault();
      set({ status: "pending" });
      set((state) => ({
        messages: [
          ...state.messages,
          {
            role: "user",
            content: state.question,
          },
        ],
      }));
      set({ question: "" });
      const { messages } = useChatStore.getState();
      const lastQuestion = messages.at(-1)?.content;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({
            messages: [
              ...messages,
              {
                role: "user",
                content: lastQuestion,
              },
            ],
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        if (!res.body) return;

        ChatCompletionStream.fromReadableStream(res.body)
          .on("content", (delta, content) => {
            const lastMessage = messages.at(-1);
            set(() => ({
              messages:
                lastMessage?.role !== "assistant"
                  ? [...messages, { role: "assistant", content }]
                  : [...messages.slice(0, -1), { ...lastMessage, content }],
            }));
          })
          .on("end", () => {
            set({ status: "idle" });
          });
      } catch (error) {
        console.error("Error handling chat question:", error);
        set({ status: "error" });
      }
    },
  })),
);
