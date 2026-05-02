import { useWaitTime } from "@/hooks/useWaitTime";
import { cn } from "@/lib/utils";

const colorMap = {
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
} as const;

export const WaitIndicator = ({ compact = false }: { compact?: boolean }) => {
  const { minutes, label, color, patientsAhead } = useWaitTime();

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium backdrop-blur">
        <span className="relative flex h-2 w-2">
          <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-60 animate-pulse-dot", colorMap[color])} />
          <span className={cn("relative inline-flex h-2 w-2 rounded-full", colorMap[color])} />
        </span>
        <span className="text-muted-foreground">Live wait:</span>
        <span className="text-foreground">{minutes === 0 ? "No wait" : `~${minutes} min`}</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border gradient-card p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-60 animate-pulse-dot", colorMap[color])} />
              <span className={cn("relative inline-flex h-2 w-2 rounded-full", colorMap[color])} />
            </span>
            Live treatment wait
          </div>
          <div className="mt-2 font-display text-3xl font-bold">
            {minutes === 0 ? "No wait" : `~${minutes} min`}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {patientsAhead === 0 ? "Chair available now" : `${patientsAhead} ${patientsAhead === 1 ? "patient" : "patients"} ahead · ${label}`}
          </div>
        </div>
        <div className={cn("h-14 w-14 rounded-2xl grid place-items-center text-primary-foreground", colorMap[color])}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};
