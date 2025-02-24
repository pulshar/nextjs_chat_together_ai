"use client";

import { useChatStore } from "@/store/store";
import { useEffect } from "react";
import ChatSession from "./components/chat/ChatSession";
import QuestionInput from "./components/chat/QuestionInput";

export default function Chat() {
  const status = useChatStore((state) => state.status);
  const resetChat = useChatStore((state) => state.resetChat);
  
  useEffect(() => {
    resetChat();
  }, [resetChat]);

  return (
    <div className="mx-auto flex w-full max-w-3xl grow flex-col px-4">
      {status === "idle" ? <QuestionInput /> : <ChatSession />}
    </div>
  );
}
