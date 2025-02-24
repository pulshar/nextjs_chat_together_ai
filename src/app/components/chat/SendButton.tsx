import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/store";
import { SendHorizontalIcon } from "lucide-react";
import LoadingDots from "../LoadingDots";

export default function SendButton() {
  const status = useChatStore((state) => state.status);
  return (
    <Button
      className="absolute right-2 top-1/2 h-10 w-16 -translate-y-1/2 rounded-md sm:right-2.5 sm:rounded-full"
      type="submit"
      size="icon"
      disabled={status === "pending"}
    >
      {status === "pending" ? <LoadingDots /> : <SendHorizontalIcon />}
      <span className="sr-only">Send question</span>
    </Button>
  );
}
