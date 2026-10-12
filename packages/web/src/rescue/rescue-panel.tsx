/** A route-render failure leaves reload and harness history available without router context. */
import { useState } from "react";
import { Button, NoticeStrip } from "@prismshadow/penguin-ui";
import { useShortcutLabel } from "../lib/shortcuts/use-keymap";
import { S } from "../lib/strings";
import { HarnessHistoryOverlay } from "../features/harness/harness-history-overlay";

function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message || error.name;
  return String(error);
}

export function RescuePanel({ error }: { error: unknown }) {
  const t = S.rescue;
  const [historyOpen, setHistoryOpen] = useState(false);
  const palette = useShortcutLabel("palette.toggle");
  return (
    <div className="flex h-dvh w-full items-center justify-center overflow-y-auto bg-white px-4 py-8 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <section role="alert" aria-labelledby="rescue-title" className="w-full max-w-xl">
        <h1 id="rescue-title" className="text-lg font-semibold">
          {t.title}
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t.desc}</p>
        <NoticeStrip
          tone="danger"
          className="mt-4 rounded-md border px-3 py-2 font-mono text-xs break-words whitespace-pre-wrap"
        >
          {messageOf(error)}
        </NoticeStrip>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="primary" size="sm" onClick={() => location.reload()}>
            {t.reload}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setHistoryOpen(true)}>
            {S.commandPalette.harnessHistory}
          </Button>
        </div>
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">{t.paletteHint(palette)}</p>
      </section>
      <HarnessHistoryOverlay open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </div>
  );
}
