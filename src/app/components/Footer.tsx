import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t text-xs text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4 py-5">
        Powered by{" "}
        <Link
          className="font-medium underline underline-offset-2 transition-colors hover:text-foreground"
          target="_blank"
          href="https://www.together.ai/"
        >
          Together AI
        </Link>
        . <span className="ml-1">Source on{" "}</span>
        <Link
          href="https://github.com/pulshar/nextjs_chat_together_ai"
          className="font-medium underline underline-offset-2 transition-colors hover:text-foreground"
        >
          GitHub
        </Link>
        .
      </div>
    </footer>
  );
}
