// Craft Imports
import { Section, Container, Prose } from "@/components/craft";

// Next.js Imports
import Link from "next/link";

// Icons
import { File, Pen, Tag, Diamond, User, Folder } from "lucide-react";
import { WordPressIcon } from "@/components/icons/wordpress";
import { NextJsIcon } from "@/components/icons/nextjs";

// This page is using the craft.tsx component and design system
export default function Home() {
  return (
    <Section>
      <Container>
        <ToDelete />
      </Container>
    </Section>
  );
}

// This is just some example TSX
const ToDelete = () => {
  return (
    <main className="space-y-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full border px-4 py-1 text-sm">
            ✨ AI Powered
          </span>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight">
            Build smarter with
            <span className="text-[#00aaa4]"> AI</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Search, generate and automate workflows with a modern AI experience.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="rounded-full bg-[#00aaa4] px-6 py-3 text-white">
              Get Started
            </button>

            <button className="rounded-full border px-6 py-3">
              ✨ Ask AI
            </button>
          </div>

          <div className="mt-10 mx-auto max-w-2xl">
            <div className="rounded-full border bg-background px-4 py-3 shadow-lg">
              🔍 Ask anything about your project...
            </div>
          </div>
        </div>    
    </main>
  );
};
