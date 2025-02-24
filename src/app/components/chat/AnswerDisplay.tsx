import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/store";
import { SendHorizontalIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AnswerDisplay() {
  const answer = useChatStore((state) => state.answer);
  const status = useChatStore((state) => state.status);
  const resetChat = useChatStore((state) => state.resetChat);
  return (
    <div className="py-12">
      <ReactMarkdown className="prose dark:prose-invert">
        {answer}
      </ReactMarkdown>
      <div className={`mt-12 ${status === "pending" ? "hidden" : "flex animate-fadeIn"}`}>
        <Button
          variant="brand"
          size="lg"
          className="group ml-auto w-full rounded-md sm:w-auto sm:rounded-3xl"
          disabled={status === "pending"}
          onClick={resetChat}
        >
          Ask another question
          <SendHorizontalIcon className="transition-transform group-hover:translate-x-2" />
        </Button>
      </div>
    </div>
  );
}
