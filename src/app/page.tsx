"use client";

import Tooltip from "@/app/components/Tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader, SendHorizontalIcon, XIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "done">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("pending");

    const res = await fetch("/api/answer", {
      method: "POST",
      body: JSON.stringify({ question }),
    });

    if (!res.body) return;

    ChatCompletionStream.fromReadableStream(res.body)
      .on("content", (delta) => setAnswer((text) => text + delta))
      .on("end", () => setStatus("done"));
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl grow flex-col px-4">
      {status === "idle" ? (
        <div className="-mt-32 flex grow flex-col justify-center">
          <h1 className="mb-8 animate-slideIn text-center text-3xl font-semibold">
            What can I help with?
          </h1>
          <form
            onSubmit={handleSubmit}
            className="relative w-full animate-fadeIn"
          >
            <Input
              variant="lg"
              className="h-[54px] rounded-md sm:rounded-full pr-[5.5rem]"
              placeholder="Ask me a question"
              autoFocus
              name="prompt"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <Button
              className="absolute right-2 sm:right-2.5 top-1/2 h-10 w-16 -translate-y-1/2 rounded-md sm:rounded-full"
              type="submit"
              size="icon"
            >
              <SendHorizontalIcon />
              <span className="sr-only">Send question</span>
            </Button>
          </form>
        </div>
      ) : (
        <>
          <div className="mt-12">
            <div className="flex justify-end">
              <div className="flex max-w-[70ch] justify-between gap-4 rounded-md bg-muted px-5 py-2.5 sm:items-center sm:rounded-3xl animate-slideIn">
                <p className="text-brand text-right">{question}</p>
                <Tooltip text="Ask another question">
                  <Button
                    size="icon"
                    variant="outline"
                    className={`-mr-2 h-8 w-8 shrink-0 rounded-3xl ${status === "pending" ? "animate-spin" : ""}`}
                    disabled={status === "pending"}
                    onClick={() => {
                      setQuestion("");
                      setAnswer("");
                      setStatus("idle");
                    }}
                  >
                    {status === "pending" ? <Loader /> : <XIcon />}
                    <span className="sr-only">New question</span>
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="py-12">
            <ReactMarkdown className="prose dark:prose-invert">
              {answer}
            </ReactMarkdown>
            <div className={`mt-12 ${status === "pending" ? "hidden" : "flex"}`}>
              <Button
                variant="brand"
                size="lg"
                className="rounded-md sm:rounded-3xl ml-auto group w-full sm:w-auto"
                disabled={status === "pending"}
                onClick={() => {
                  setQuestion("");
                  setAnswer("");
                  setStatus("idle");
                }}
              >
                Ask another question
                <SendHorizontalIcon className="group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
