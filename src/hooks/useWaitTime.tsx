import { useEffect, useState } from "react";

// Simulated live wait time. Updates every 30s based on time of day.
export type WaitStatus = {
  minutes: number;
  label: string;
  color: "success" | "warning" | "destructive";
  patientsAhead: number;
};

function compute(): WaitStatus {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  // Base load: morning rush + lunch dip + evening peak
  let base = 5;
  if (hour >= 8 && hour < 11) base = 18;
  else if (hour >= 11 && hour < 13) base = 8;
  else if (hour >= 13 && hour < 17) base = 14;
  else if (hour >= 17 && hour < 19) base = 22;
  else base = 4;

  // Slight variance each minute
  const variance = ((minute * 7) % 9) - 4;
  const minutes = Math.max(0, base + variance);
  const patientsAhead = Math.max(0, Math.round(minutes / 9));

  let label = "Walk right in";
  let color: WaitStatus["color"] = "success";
  if (minutes >= 10 && minutes < 20) {
    label = "Short wait";
    color = "warning";
  } else if (minutes >= 20) {
    label = "Busy now";
    color = "destructive";
  }
  return { minutes, label, color, patientsAhead };
}

export function useWaitTime() {
  const [status, setStatus] = useState<WaitStatus>(() => compute());
  useEffect(() => {
    const id = setInterval(() => setStatus(compute()), 30_000);
    return () => clearInterval(id);
  }, []);
  return status;
}
