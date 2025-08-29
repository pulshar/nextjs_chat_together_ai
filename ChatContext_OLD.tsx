import { createContext, useContext, useState, useEffect, FormEvent, ReactNode } from "react";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream";
import useVoiceRecognition from "../hooks/useVoiceRecognition";

type ChatStatus = "idle" | "pending" | "done";

interface ChatContextType {
  question: string;
  setQuestion: (value: string) => void;
  answer: string;
  status: ChatStatus;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  resetChat: () => void;
  isSpeechActive: boolean;
  handleOnRecord: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [status, setStatus] = useState<ChatStatus>("idle");

  const { isSpeechActive, textSpeech, handleOnRecord } = useVoiceRecognition();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");

    const res = await fetch("/api/answer", {
      method: "POST",
      body: JSON.stringify({ question }),
    });

    if (!res.body) return;

    ChatCompletionStream.fromReadableStream(res.body)
      .on("content", (delta) => setAnswer((prev) => prev + delta))
      .on("end", () => setStatus("done"));
  }

  function resetChat() {
    setQuestion("");
    setAnswer("");
    setStatus("idle");
  }

  useEffect(() => {
    if (textSpeech) setQuestion(textSpeech);
  }, [textSpeech]);

  return (
    <ChatContext.Provider value={{ question, setQuestion, answer, status, handleSubmit, resetChat, isSpeechActive, handleOnRecord }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
