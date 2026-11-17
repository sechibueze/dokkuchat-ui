import { create } from 'zustand';

interface RateLimitState {
  /** Epoch milliseconds when requests may resume, or null when not limited. */
  retryAt: number | null;
  startCooldown: (retryAt: number) => void;
  clearCooldown: () => void;
}

export const useRateLimitStore = create<RateLimitState>()((set) => ({
  retryAt: null,
  // Keep whichever deadline is later so an earlier 429 never shortens a longer one.
  startCooldown: (retryAt) =>
    set((state) => ({ retryAt: Math.max(state.retryAt ?? 0, retryAt) })),
  clearCooldown: () => set({ retryAt: null }),
}));

/** Non-reactive check for use inside async functions and timers. */
export function isRateLimitActive(): boolean {
  const { retryAt } = useRateLimitStore.getState();
  return retryAt !== null && retryAt > Date.now();
}
