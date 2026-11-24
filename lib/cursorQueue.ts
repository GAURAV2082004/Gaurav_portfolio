// Shared Cursor & LiveBuild queue store (React-safe, zero re-renders)
export interface BuildJob {
  id: string;
  element: HTMLElement;
  isGraphic?: boolean;
  onStart?: () => void;
  onCharacter?: (charEl: HTMLElement) => void;
  onComplete?: () => void;
}

type JobListener = (job: BuildJob) => void;

class CursorQueueManager {
  private queue: BuildJob[] = [];
  private listeners: JobListener[] = [];
  private registeredIds = new Set<string>();
  public isFastMode = false;

  constructor() {
    if (typeof window !== "undefined") {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isNarrow = window.innerWidth < 520;
      const hasFastQuery = /[?&]fast\b/i.test(window.location.search);
      this.isFastMode = reduceMotion || isNarrow || hasFastQuery;
    }
  }

  public register(job: BuildJob) {
    if (this.registeredIds.has(job.id)) return;
    this.registeredIds.add(job.id);

    if (this.isFastMode) {
      // Instantly reveal in fast/reduced motion mode
      job.onComplete?.();
      return;
    }

    this.queue.push(job);
    this.notify();
  }

  public dequeue(): BuildJob | undefined {
    return this.queue.shift();
  }

  public hasJobs(): boolean {
    return this.queue.length > 0;
  }

  public subscribe(listener: JobListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    if (this.queue.length > 0 && this.listeners.length > 0) {
      const listener = this.listeners[0];
      const job = this.queue[0];
      if (job && typeof listener === "function") {
        listener(job);
      }
    }
  }
}

export const cursorQueue = new CursorQueueManager();
