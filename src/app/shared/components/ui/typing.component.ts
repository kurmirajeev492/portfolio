import { ChangeDetectionStrategy, Component, OnDestroy, afterNextRender, input, signal } from '@angular/core';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrl: './typing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypingComponent implements OnDestroy {
  readonly items = input<string[]>([]);
  readonly typeMs = input<number>(60);
  readonly deleteMs = input<number>(38);
  readonly pauseMs = input<number>(900);

  readonly text = signal('');
  readonly cursorOn = signal(true);

  private raf: number | null = null;
  private cursorTimer: number | null = null;
  private timer: number | null = null;

  constructor() {
    afterNextRender(() => {
      this.cursorTimer = window.setInterval(() => this.cursorOn.set(!this.cursorOn()), 520);
      this.start();
    });
  }

  ngOnDestroy(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.cursorTimer) window.clearInterval(this.cursorTimer);
    if (this.timer) window.clearTimeout(this.timer);
  }

  private start() {
    const list = this.items();
    if (!list.length) return;

    let index = 0;
    let phase: 'typing' | 'pausing' | 'deleting' = 'typing';

    const tick = () => {
      const full = list[index] ?? '';
      const current = this.text();

      if (phase === 'typing') {
        const next = full.slice(0, current.length + 1);
        this.text.set(next);
        if (next === full) phase = 'pausing';
        this.timer = window.setTimeout(tick, this.typeMs());
        return;
      }

      if (phase === 'pausing') {
        phase = 'deleting';
        this.timer = window.setTimeout(tick, this.pauseMs());
        return;
      }

      const next = current.slice(0, -1);
      this.text.set(next);
      if (!next) {
        index = (index + 1) % list.length;
        phase = 'typing';
      }
      this.timer = window.setTimeout(tick, this.deleteMs());
    };

    this.timer = window.setTimeout(tick, 240);
  }
}

