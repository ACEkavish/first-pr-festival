import type { Metadata } from "next";
import Link from "next/link";
import { SpiderEmblem, WebCorner } from "@/components/SpiderArt";
import { getStages, LEVELS } from "@/data/levels";

export const metadata: Metadata = {
  title: "Git-Verse Cheat Sheet | First PR Festival",
  description: "One-page command reference for all eleven chapters across two acts. Print it.",
};

export default function CheatSheet() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 print:hidden">
        <WebCorner className="absolute -left-16 -top-16 h-[36rem] w-[36rem]" opacity={0.4} />
      </div>

      <header className="mb-8 flex items-start justify-between gap-6 border-b-2 border-web-red/50 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <SpiderEmblem className="h-8 w-8 text-web-red" color="currentColor" />
            <h1 className="font-display text-4xl uppercase leading-none tracking-wide text-silk print:text-black">
              Git-Verse Cheat Sheet
            </h1>
          </div>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-silk-dim print:text-neutral-600">
            First PR Festival : Intro to Github and Open Source
          </p>
        </div>
        <div className="flex shrink-0 gap-2 print:hidden">
          <Link
            href="/game"
            className="rounded-md border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-silk-dim transition hover:border-web-red/60 hover:text-web-scarlet"
          >
            Back to game
          </Link>
        </div>
      </header>

      <div className="space-y-6 print:space-y-4">
        {[1, 2].map((act) => (
          <section key={act}>
            <h2 className="mb-3 font-display text-2xl uppercase tracking-wide text-web-red print:text-black">
              Act {act} — {act === 1 ? "Your First Pull Request" : "The Symbiote"}
            </h2>
            <div className="space-y-2.5">
              {LEVELS.filter((l) => l.act === act).map((level) => {
                const commands = getStages(level)
                  .map((s) => s.expectedDisplay)
                  .filter((c) => !c.startsWith("no command") && !c.startsWith("resolve"));
                return (
                  <div
                    key={level.id}
                    className="break-inside-avoid rounded-lg border border-white/10 bg-white/[0.02] p-3.5 print:border-neutral-300 print:bg-white"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-display text-lg text-web-scarlet print:text-black">
                        {level.id}
                      </span>
                      <span className="font-display text-lg uppercase tracking-wide text-silk print:text-black">
                        {level.codename}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-silk-faint print:text-neutral-500">
                        {level.title}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-silk/75 print:text-neutral-700">
                      {level.objective}
                    </p>
                    {commands.length > 0 ? (
                      <ul className="mt-2 space-y-1">
                        {commands.map((cmd) => (
                          <li
                            key={cmd}
                            className="rounded bg-black/50 px-2.5 py-1 font-mono text-[13px] text-web-scarlet print:bg-neutral-100 print:text-black"
                          >
                            {cmd}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 font-mono text-xs italic text-silk-faint print:text-neutral-500">
                        No command — done in your editor / in the browser.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-8 break-inside-avoid rounded-lg border border-web-red/30 bg-web-red/[0.05] p-4 print:border-neutral-400 print:bg-white">
        <h2 className="font-display text-xl uppercase tracking-wide text-web-red print:text-black">
          When it goes wrong
        </h2>
        <dl className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {[
            ["Terminal filled with text, can't type", "You're in vim. Press Esc, type :q! and Enter."],
            ["Please tell me who you are", "Run the two git config --global commands from Chapter 0."],
            ["It wants a password", "GitHub doesn't take passwords. Use a Personal Access Token as the password."],
            ["no upstream branch", "git push -u origin main"],
            ["pathspec 'main' did not match", "Your branch is called master. Use that instead."],
            ["nothing to commit", "You didn't save the file in VS Code."],
            ["unmerged files", "You resolved the conflict but forgot: git add ."],
            ["Which branch am I on?", "git branch — the one with the * beside it."],
          ].map(([symptom, fix]) => (
            <div key={symptom}>
              <dt className="font-mono text-xs text-web-scarlet print:text-black">{symptom}</dt>
              <dd className="text-sm text-silk/75 print:text-neutral-700">{fix}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-silk-faint print:text-neutral-500">
        With great power comes great responsibility — not root access.
      </p>
    </main>
  );
}
