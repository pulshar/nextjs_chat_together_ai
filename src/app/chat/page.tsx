"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontalIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import Together from "together-ai";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream";
import LoadingDots from "../components/LoadingDots";

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<
    Together.Chat.Completions.CompletionCreateParams.Message[]
  >([]);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setPrompt("");
    setIsPending(true);
    setMessages((messages) => [
      ...messages,
      {
        role: "user",
        content: prompt,
      },
    ]);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [
          ...messages,
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!res.body) return;

    ChatCompletionStream.fromReadableStream(res.body)
      .on("content", (delta, content) => {
        setMessages((messages) => {
          const lastMessage = messages.at(-1);

          if (lastMessage?.role !== "assistant") {
            return [...messages, { role: "assistant", content }];
          } else {
            return [...messages.slice(0, -1), { ...lastMessage, content }];
          }
        });
      })
      .on("end", () => {
        setIsPending(false);
      });
  }

  return (
    <>
      <div className="flex h-0 grow flex-col-reverse overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-10">
          {messages.map((message, i) => (
            <div key={i} className="flex">
              {message.role === "user" ? (
                <div className="ml-auto mt-8 mb-2 rounded-md sm:rounded-3xl bg-muted px-5 py-3 text-brand text-right animate-slideIn">
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

      <div className="mb-12 flex justify-center animate-slideIn">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-3xl px-4 lg:pl-0"
        >
          <fieldset className="relative w-full">
            <Input
              variant="lg"
              className="h-[54px] rounded-md sm:rounded-full pr-[5.5rem]"
              autoFocus
              placeholder="Send a message"
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              className="absolute right-2 sm:right-2.5 top-1/2 h-10 w-16 -translate-y-1/2 rounded-md sm:rounded-full"
              type="submit"
              disabled={isPending}
            >
              {isPending ? <LoadingDots /> : <SendHorizontalIcon />}
              <span className="sr-only">Start chatting</span>
            </Button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
