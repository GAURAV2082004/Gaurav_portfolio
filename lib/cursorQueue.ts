// Shared Cursor & LiveBuild queue store (React-safe, zero re-renders)
export interface BuildJob {
  id: string;
  element: HTMLElement;
  isGraphic?: boolean;
  timeoutId?: NodeJS.Timeout;
}

type JobListener = () => void;

class CursorQueueManager {
  private queue: BuildJob[] = [];
  private listeners: JobListener[] = [];
  private registeredEls = new WeakSet<HTMLElement>();
  private observer: IntersectionObserver | null = null;

  public get isFastMode(): boolean {
    if (typeof window === "undefined") return false;
    const isNarrow = window.innerWidth < 520;
    const hasFastQuery = /[?&]fast\b/i.test(window.location.search);
    return isNarrow || hasFastQuery;
  }

  constructor() {
    if (typeof window !== "undefined") {
      this.initObserver();
    }
  }

  private initObserver() {
    if (typeof window === "undefined" || this.observer) return;
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            this.observer?.unobserve(el);
            this.enqueueElement(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 80px 0px" }
    );
  }

  public registerBlock(el: HTMLElement, opts?: { id?: string; isGraphic?: boolean }) {
    if (typeof window === "undefined" || !el) return;
    if (this.registeredEls.has(el)) return;
    this.registeredEls.add(el);

    if (opts?.id) el.dataset.liveBuild = opts.id;
    if (opts?.isGraphic) el.dataset.isGraphic = "true";

    if (this.isFastMode) {
      this.reveal(el);
      return;
    }

    if (!this.observer) this.initObserver();
    this.observer?.observe(el);
  }

  public enqueueElement(el: HTMLElement) {
    if (this.isFastMode) {
      this.reveal(el);
      return;
    }

    const id = el.dataset.liveBuild || `job-${Math.random().toString(36).slice(2, 8)}`;
    const isGraphic = el.dataset.isGraphic === "true";

    const job: BuildJob = {
      id,
      element: el,
      isGraphic,
    };

    // 8.5-second safety net timeout: if queue was full or skipped, reveal automatically
    job.timeoutId = setTimeout(() => {
      const idx = this.queue.indexOf(job);
      if (idx > -1) {
        this.queue.splice(idx, 1);
        this.reveal(job.element);
      }
    }, 8500);

    this.queue.push(job);
    this.notify();
  }

  public dequeue(): BuildJob | undefined {
    return this.queue.shift();
  }

  public hasJobs(): boolean {
    return this.queue.length > 0;
  }

  public onJob(listener: JobListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public reveal(el: HTMLElement) {
    if (!el) return;
    el.classList.remove("pre");
    el.classList.add("fillin");
    el.querySelectorAll<HTMLElement>('[data-typed-char="true"], .ch').forEach((ch) => {
      ch.classList.add("on");
    });
    setTimeout(() => {
      el.classList.remove("fillin");
    }, 1000);
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch (e) {
        console.error(e);
      }
    });
  }
}

export const cursorQueue = new CursorQueueManager();
