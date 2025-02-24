import { useChatStore } from "@/store/store";
import { useRef, useState } from "react";

function useVoiceRecognition() {
  const setQuestion = useChatStore((state) => state.setQuestion);
  const recognitionRef = useRef<SpeechRecognition>();
  const [isSpeechActive, setIsSpeechActive] = useState(false);

  function handleOnRecord() {
    if (isSpeechActive) {
      recognitionRef.current?.stop();
      setIsSpeechActive(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.onstart = function () {
      setIsSpeechActive(true);
    };

    recognitionRef.current.onend = function () {
      setIsSpeechActive(false);
    };
    recognitionRef.current.onresult = async function (event) {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
    };
    recognitionRef.current.start();
  }

  return {
    handleOnRecord,
    isSpeechActive,
  };
}

export default useVoiceRecognition;
