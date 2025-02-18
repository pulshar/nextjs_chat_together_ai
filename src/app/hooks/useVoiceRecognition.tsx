import { useRef, useState } from "react";

function useVoiceRecognition() {
  const recognitionRef = useRef<SpeechRecognition>();
  const [textSpeech, setTextSpeech] = useState("");
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
      setTextSpeech(transcript);
    };
    recognitionRef.current.start();
  }

  return {
    handleOnRecord,
    textSpeech,
    isSpeechActive,
  };
}

export default useVoiceRecognition;
