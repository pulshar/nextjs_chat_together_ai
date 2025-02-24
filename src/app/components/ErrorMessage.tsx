"use client";

import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/store";
import { RefreshCcwIcon } from "lucide-react";

export default function ErrorMessage() {
  const status = useChatStore((state) => state.status);
  const resetChat = useChatStore((state) => state.resetChat);
  if (status === "error")
    return (
      <div className="fixed z-10 h-full w-full bg-background/90">
        <div className="absolute left-1/2 top-1/2 -mt-6 -translate-x-1/2 -translate-y-1/2">
          <Button onClick={resetChat} variant="destructive">
            An error occurred. Please try again.
            <RefreshCcwIcon />
          </Button>
        </div>
      </div>
    );
}
