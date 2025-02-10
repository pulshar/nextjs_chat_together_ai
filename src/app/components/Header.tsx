import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import NavLink from "./NavLink";
import { ThemeToggleButton } from "./ThemeToggleButton";

export default function Header() {
  return (
    <header className="border-b text-sm font-medium sticky top-0 bg-background">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
        <NavLink
          className="text-muted-foreground/80 transition-colors hover:text-foreground data-[active]:pointer-events-none data-[active]:text-foreground"
          href="/"
        >
          Ask a question
        </NavLink>
        <span className="text-muted-foreground/80">|</span>
        <NavLink
          className="text-muted-foreground/80 transition-colors hover:text-foreground data-[active]:pointer-events-none data-[active]:text-foreground"
          href="/chat"
        >
          Chat
        </NavLink>

        <div className="ml-auto">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link href="https://github.com/pulshar/nextjs_chat_together_ai">
                <Github className="h-5 w-5" />
                <span className="sr-only">Github link</span>
              </Link>
            </Button>

            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  );
}
