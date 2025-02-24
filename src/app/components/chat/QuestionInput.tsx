
import { Input } from "@/components/ui/input";
import SendButton from "./SendButton";
import VoiceButton from "./VoiceButton";
import { useChatStore } from "@/store/store";

export default function QuestionInput() {
  const question = useChatStore((state)=> state.question)
  const setQuestion = useChatStore((state)=> state.setQuestion)
  const handleSubmitQuestion = useChatStore((state)=> state.handleSubmitQuestion)

  return (
    <div className="-mt-32 flex grow flex-col justify-center">
      <h1 className="mb-8 animate-slideIn text-center text-3xl font-semibold">
        What can I help with?
      </h1>
      <form onSubmit={handleSubmitQuestion} className="relative w-full animate-fadeIn">
        <Input
          variant="lg"
          className="h-[54px] rounded-md pr-[5.5rem] sm:rounded-full"
          placeholder="Ask me a question"
          autoFocus
          name="prompt"
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {question ? <SendButton /> : <VoiceButton />}
      </form>
    </div>
  );
}
