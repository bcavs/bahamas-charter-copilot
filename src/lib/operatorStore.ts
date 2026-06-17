// Browser-backed operator profile store.
//
// Read via useSyncExternalStore so the client can hydrate from localStorage
// without a hydration mismatch (the server snapshot is null → sample operator),
// and without calling setState inside an effect. Writes persist and notify
// subscribers in the same tab.

import { sampleOperator, type OperatorProfile } from "./operator";
import { operatorProfileSchema } from "./operatorSchema";

const STORAGE_KEY = "bcc.operator.v1";

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  // Cross-tab edits arrive via the storage event.
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

export function getSnapshot(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function getServerSnapshot(): string | null {
  return null;
}

export function writeOperator(operator: OperatorProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(operator));
  } catch {
    // Storage may be unavailable (private mode); notify so edits still render.
  }
  emit();
}

// Turn a raw snapshot string into a validated profile, falling back to the
// sample operator for empty or malformed storage.
export function parseSnapshot(raw: string | null): OperatorProfile {
  if (!raw) return sampleOperator;
  try {
    const parsed = operatorProfileSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : sampleOperator;
  } catch {
    return sampleOperator;
  }
}
