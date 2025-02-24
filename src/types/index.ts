import { FormEvent } from "react";
import Together from "together-ai";


export type ChatState = {
  status: "idle" | "pending" | "done" | "error";
  question: string;
  answer: string;
  messages: Together.Chat.Completions.CompletionCreateParams.Message[];
  setQuestion: (value: string) => void;
  resetChat: () => void;
  handleSubmitQuestion: (e: FormEvent<HTMLFormElement>) => void;
  handleSubmitChat: (e: FormEvent<HTMLFormElement>) => void;
};
