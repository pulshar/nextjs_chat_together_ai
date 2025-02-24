"use client";

import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/store";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SendButton from "../components/chat/SendButton";
import VoiceButton from "../components/chat/VoiceButton";

export default function Chat() {
  const question = useChatStore((state) => state.question);
  const status = useChatStore((state) => state.status);
  const setQuestion = useChatStore((state) => state.setQuestion);
  const messages = useChatStore((state) => state.messages);
  const handleSubmit = useChatStore((state) => state.handleSubmitChat);
  const resetChat = useChatStore((state) => state.resetChat);

  useEffect(() => {
    resetChat();
  }, [resetChat]);

  return (
    <>
      <div className="flex h-0 grow flex-col-reverse overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-10">
          {messages.map((message, i) => (
            <div key={i} className="flex">
              {message.role === "user" ? (
                <div className="mb-2 ml-auto mt-8 animate-slideIn rounded-md bg-muted px-5 py-3 text-right text-brand sm:rounded-3xl">
                  {message.content}
                </div>
              ) : (
                <ReactMarkdown className="prose dark:prose-invert">
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12 flex animate-slideIn justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-3xl px-4 lg:pl-0"
        >
          <fieldset className="relative w-full">
            <Input
              variant="lg"
              className="h-[54px] rounded-md pr-[5.5rem] sm:rounded-full"
              autoFocus
              placeholder="Send a message"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            {question || status === "pending" ? (
              <SendButton />
            ) : (
              <VoiceButton />
            )}
          </fieldset>
        </form>
      </div>
    </>
  );
}
