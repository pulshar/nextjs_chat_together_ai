
import { Button } from "@/components/ui/button";
import { Disc3Icon, MicIcon } from "lucide-react";
import Tooltip from "../Tooltip";
import useVoiceRecognition from "@/app/hooks/useVoiceRecognition";

export default function VoiceButton() {
  const { isSpeechActive, handleOnRecord } = useVoiceRecognition();
  return (
    <Tooltip text={isSpeechActive ? "Recording voice" : "Use voice mode"}>
      <Button
        onClick={handleOnRecord}
        variant={isSpeechActive ? "destructive" : "brand"}
        className="absolute right-2 top-1/2 h-10 w-16 -translate-y-1/2 rounded-md sm:right-2.5 sm:rounded-full"
        type="button"
        size="icon"
      >
        {isSpeechActive ? <Disc3Icon className="animate-spin" /> : <MicIcon />}
        <span className="sr-only">Record question</span>
      </Button>
    </Tooltip>
  );
}
