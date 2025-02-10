import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as TooltipWrapper,
} from "@/components/ui/tooltip";

type TooltipProps = {
  children: React.ReactNode;
  text: string;
};

export default function Tooltip({ children, text }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipWrapper>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </TooltipWrapper>
    </TooltipProvider>
  );
}
