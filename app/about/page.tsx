import { MainSection } from "@/components/layout/mainSection";
import { Info, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how this blog is written, using AI assistance with human review.",
};

const processSteps = [
  "Topic research — relevant, current developer topics are chosen",
  "AI drafting — an initial draft is generated with code examples",
  "Human review — facts, code, and clarity are checked before publishing",
];

export default function AboutPage() {
  return (
    <MainSection narrow>
      <div className="max-w-2xl mx-auto">
        <span className="inline-block font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[var(--color-accent-tint)] text-[var(--color-accent-dark)] mb-4">
          About this blog
        </span>

        <h1 className="text-3xl font-bold tracking-tight text-(--text) mb-3">
          How this blog works
        </h1>

        <p className="text-base leading-relaxed text-(--muted) mb-8">
          A technical blog covering web development, JavaScript, and modern
          tooling — written with the help of AI, reviewed by a human.
        </p>

        <div className="flex gap-3 p-4 rounded-xl border border-accent-dark mb-8">
          <Info size={20} className="text-accent-dark shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-accent-dark mb-1">
              Transparency notice
            </p>
            <p className="text-sm leading-relaxed text-accent-dark">
              Articles on this blog are drafted using AI language models, then
              reviewed and edited before publishing.
            </p>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-(--text) mb-2">
            Why AI-assisted
          </h2>
          <p className="text-sm leading-relaxed text-(--muted)">
            AI helps research topics quickly, draft explanations clearly, and
            keep up with a fast-moving ecosystem. It lets this blog publish
            consistently without sacrificing depth.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-(--text) mb-3">
            Our process
          </h2>
          <div className="flex flex-col gap-2.5">
            {processSteps.map((step, i) => (
              <div
                key={step}
                className="flex gap-3 items-start p-3.5 rounded-lg border border-(--border)"
              >
                <span className="font-mono text-xs font-bold text-(--muted) min-w-4.5">
                  0{i + 1}
                </span>
                <p className="text-sm text-(--muted) leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-start gap-3 pt-6 border-t border-(--border)">
          <Mail size={18} className="text-(--muted) shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-semibold text-(--text) mb-1">
              Found an error?
            </h2>
            <p className="text-sm leading-relaxed text-(--muted)">
              AI-generated content can occasionally contain mistakes. If
              something looks off, reach out and it will be corrected.
            </p>
          </div>
        </section>
      </div>
    </MainSection>
  );
}
