"use client";

import { useMemo, useState } from "react";

type SignalMeterProps = {
  leftLabel?: string;
  rightLabel?: string;
};

function buildWavePath(width: number, height: number, intensity: number) {
  const midY = height / 2;
  const amplitude = 3 + intensity * 10;
  const frequency = 2 + intensity * 1.5;
  const points = 44;

  let path = `M 0 ${midY.toFixed(2)}`;
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * width;
    const t = i / points;
    const y = midY + Math.sin(t * Math.PI * 2 * frequency) * amplitude;
    path += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return path;
}

export function SignalMeter({
  leftLabel = "Strategy",
  rightLabel = "Creative",
}: SignalMeterProps) {
  const [value, setValue] = useState(55);
  const intensity = value / 100;

  const wavePath = useMemo(() => buildWavePath(220, 44, intensity), [intensity]);
  const dotX = useMemo(() => 10 + intensity * 200, [intensity]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/70">
          Signal Meter
        </div>
        <div className="font-mono text-xs tracking-widest text-text-secondary/70">
          {Math.round(value)}%
        </div>
      </div>

      <div className="mt-3">
        <svg viewBox="0 0 220 44" className="h-11 w-full">
          <defs>
            <linearGradient id="signalGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="55%" stopColor="rgba(255,59,48,0.55)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
            </linearGradient>
          </defs>
          <path d={wavePath} fill="none" stroke="url(#signalGradient)" strokeWidth="1.6" />
          <circle cx={dotX} cy="22" r="2.6" fill="rgba(255,59,48,0.85)" />
        </svg>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-text-secondary">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>

      <input
        aria-label="Signal balance"
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--color-accent)]"
      />
    </div>
  );
}

