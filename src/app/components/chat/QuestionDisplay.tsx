import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/store";
import { Loader, XIcon } from "lucide-react";
import Tooltip from "../Tooltip";

export default function QuestionDisplay() {
  const question = useChatStore((state) => state.question);
  const status = useChatStore((state) => state.status);
  const resetChat = useChatStore((state) => state.resetChat);

  return (
    <div className="mt-12 flex justify-end">
      <div className="flex max-w-[70ch] animate-slideIn justify-between gap-4 rounded-md bg-muted px-5 py-2.5 sm:items-center sm:rounded-3xl">
        <p className="text-right text-brand">{question}</p>
        <Tooltip text="Ask another question">
          <Button
            size="icon"
            variant="outline"
            className={`-mr-2 h-8 w-8 shrink-0 rounded-3xl ${status === "pending" ? "animate-spin" : ""}`}
            disabled={status === "pending"}
            onClick={resetChat}
          >
            {status === "pending" ? <Loader /> : <XIcon />}
            <span className="sr-only">New question</span>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
