"use client";

import { useState } from "react";

import {
  ACTIVITIES,
  type Activity,
  type OperatorProfile,
  type Trip,
} from "@/lib/operator";

type Props = {
  operator: OperatorProfile;
  onChange: (next: OperatorProfile) => void;
  onReset: () => void;
};

// Edits comma-separated lists without fighting the user mid-type: the input is
// uncontrolled (so typing commas is smooth) and commits the parsed array on
// blur. The `key` remounts it only when the external value actually changes,
// e.g. on reset to sample.
function CommaInput({
  value,
  onCommit,
  placeholder,
}: {
  value: string[];
  onCommit: (next: string[]) => void;
  placeholder?: string;
}) {
  const joined = value.join(", ");
  return (
    <input
      key={joined}
      type="text"
      defaultValue={joined}
      placeholder={placeholder}
      onBlur={(e) =>
        onCommit(
          e.target.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        )
      }
      className={inputClass}
    />
  );
}

const inputClass =
  "w-full rounded-md border border-black/15 bg-[#faf8f1] px-3 py-2 text-sm outline-none focus:border-[#1b6b5f] focus:ring-1 focus:ring-[#1b6b5f]";
const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.12em] text-black/45";

function newTrip(): Trip {
  return {
    id: `trip-${Date.now().toString(36)}`,
    name: "",
    activities: [],
    durationHours: 4,
    basePrice: 0,
    priceBasis: "per charter",
    maxGuests: 8,
    inclusions: [],
  };
}

export default function OperatorSetup({ operator, onChange, onReset }: Props) {
  const [open, setOpen] = useState(false);

  function setField<K extends keyof OperatorProfile>(
    key: K,
    val: OperatorProfile[K],
  ) {
    onChange({ ...operator, [key]: val });
  }

  function updateTrip(id: string, patch: Partial<Trip>) {
    onChange({
      ...operator,
      trips: operator.trips.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    });
  }

  function removeTrip(id: string) {
    onChange({ ...operator, trips: operator.trips.filter((t) => t.id !== id) });
  }

  function toggleActivity(id: string, activity: Activity) {
    const trip = operator.trips.find((t) => t.id === id);
    if (!trip) return;
    const has = trip.activities.includes(activity);
    updateTrip(id, {
      activities: has
        ? trip.activities.filter((a) => a !== activity)
        : [...trip.activities, activity],
    });
  }

  return (
    <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Operator setup</h2>
          <p className="mt-1 text-sm text-black/55">
            {operator.businessName} · {operator.homeIsland} ·{" "}
            {operator.trips.length} trips
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 rounded-md border border-black/15 px-3 py-2 text-sm font-semibold transition hover:border-[#1b6b5f] hover:text-[#1b6b5f]"
        >
          {open ? "Done" : "Edit"}
        </button>
      </div>

      {!open && (
        <p className="mt-4 text-xs leading-5 text-black/50">
          Edit your business details and trip menu so drafts quote your real
          routes and prices. Saved on this device.
        </p>
      )}

      {open && (
        <div className="mt-5 flex flex-col gap-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className={labelClass}>Business name</span>
              <input
                className={inputClass}
                value={operator.businessName}
                onChange={(e) => setField("businessName", e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className={labelClass}>Captain name</span>
              <input
                className={inputClass}
                value={operator.captainName}
                onChange={(e) => setField("captainName", e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className={labelClass}>Home island</span>
              <input
                className={inputClass}
                value={operator.homeIsland}
                onChange={(e) => setField("homeIsland", e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className={labelClass}>WhatsApp number</span>
              <input
                className={inputClass}
                value={operator.whatsappNumber}
                onChange={(e) => setField("whatsappNumber", e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className={labelClass}>Tone</span>
              <select
                className={inputClass}
                value={operator.tone}
                onChange={(e) =>
                  setField("tone", e.target.value as OperatorProfile["tone"])
                }
              >
                <option value="warm">Warm</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className={labelClass}>Pickup areas</span>
              <CommaInput
                value={operator.pickupAreas}
                onCommit={(next) => setField("pickupAreas", next)}
                placeholder="Nassau Harbour, Paradise Island"
              />
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className={labelClass}>Deposit rule</span>
              <input
                className={inputClass}
                value={operator.depositRule}
                onChange={(e) => setField("depositRule", e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className={labelClass}>Cancellation policy</span>
              <input
                className={inputClass}
                value={operator.cancellationPolicy}
                onChange={(e) => setField("cancellationPolicy", e.target.value)}
              />
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Trip menu</h3>
              <button
                type="button"
                onClick={() =>
                  onChange({ ...operator, trips: [...operator.trips, newTrip()] })
                }
                className="rounded-md bg-[#1b6b5f] px-3 py-1.5 text-xs font-semibold text-white"
              >
                + Add trip
              </button>
            </div>

            {operator.trips.map((trip) => (
              <div
                key={trip.id}
                className="rounded-md border border-black/10 bg-[#faf8f1] p-3"
              >
                <div className="flex items-center gap-2">
                  <input
                    className={`${inputClass} font-medium`}
                    placeholder="Trip name"
                    value={trip.name}
                    onChange={(e) => updateTrip(trip.id, { name: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => removeTrip(trip.id)}
                    aria-label="Remove trip"
                    className="shrink-0 rounded-md border border-black/15 bg-white px-2.5 py-2 text-sm text-black/50 transition hover:border-red-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {ACTIVITIES.map((activity) => {
                    const active = trip.activities.includes(activity);
                    return (
                      <button
                        key={activity}
                        type="button"
                        onClick={() => toggleActivity(trip.id, activity)}
                        className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                          active
                            ? "bg-[#1b6b5f] text-white"
                            : "border border-black/15 bg-white text-black/55 hover:border-[#1b6b5f]"
                        }`}
                      >
                        {activity}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Hours</span>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      className={inputClass}
                      value={trip.durationHours}
                      onChange={(e) =>
                        updateTrip(trip.id, {
                          durationHours: Number(e.target.value) || 0,
                        })
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Max guests</span>
                    <input
                      type="number"
                      min="1"
                      className={inputClass}
                      value={trip.maxGuests}
                      onChange={(e) =>
                        updateTrip(trip.id, {
                          maxGuests: Number(e.target.value) || 0,
                        })
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Base price $</span>
                    <input
                      type="number"
                      min="0"
                      className={inputClass}
                      value={trip.basePrice}
                      onChange={(e) =>
                        updateTrip(trip.id, {
                          basePrice: Number(e.target.value) || 0,
                        })
                      }
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={labelClass}>Basis</span>
                    <select
                      className={inputClass}
                      value={trip.priceBasis}
                      onChange={(e) =>
                        updateTrip(trip.id, {
                          priceBasis: e.target.value as Trip["priceBasis"],
                        })
                      }
                    >
                      <option value="per charter">per charter</option>
                      <option value="per guest">per guest</option>
                    </select>
                  </label>
                </div>

                <label className="mt-2 flex flex-col gap-1">
                  <span className={labelClass}>Inclusions</span>
                  <CommaInput
                    value={trip.inclusions}
                    onCommit={(next) =>
                      updateTrip(trip.id, { inclusions: next })
                    }
                    placeholder="Snorkel gear, Lunch & drinks"
                  />
                </label>
              </div>
            ))}

            {operator.trips.length === 0 && (
              <p className="text-sm text-black/45">
                No trips yet. Add at least one so drafts can recommend it.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-black/10 pt-4">
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-medium text-black/45 underline-offset-2 hover:underline"
            >
              Reset to sample operator
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md bg-[#1b6b5f] px-4 py-2 text-sm font-semibold text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
