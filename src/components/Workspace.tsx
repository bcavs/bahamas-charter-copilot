"use client";

import { useMemo, useSyncExternalStore } from "react";

import InquiryConsole from "@/components/InquiryConsole";
import OperatorSetup from "@/components/OperatorSetup";
import { sampleOperator } from "@/lib/operator";
import {
  getServerSnapshot,
  getSnapshot,
  parseSnapshot,
  subscribe,
  writeOperator,
} from "@/lib/operatorStore";

export default function Workspace() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const operator = useMemo(() => parseSnapshot(raw), [raw]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <section className="flex flex-col gap-6">
        <div className="rounded-lg border border-[#1b6b5f]/25 bg-[#e5f3ed] p-5">
          <h2 className="text-lg font-semibold">First sales promise</h2>
          <p className="mt-2 text-sm leading-6 text-black/70">
            A captain can paste a real inquiry, review the extracted lead, and
            copy a professional WhatsApp reply in under 60 seconds.
          </p>
        </div>

        <OperatorSetup
          operator={operator}
          onChange={writeOperator}
          onReset={() => writeOperator(sampleOperator)}
        />
      </section>

      <InquiryConsole operator={operator} />
    </div>
  );
}
