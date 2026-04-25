import { ChangeDetectionStrategy, Component, OnDestroy, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-count-up',
  templateUrl: './count-up.component.html',
  styleUrl: './count-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountUpComponent implements OnDestroy {
  readonly value = input<number | null>(null);
  readonly durationMs = input<number>(900);
  readonly format = input<'plain' | 'compact'>('plain');

  readonly display = signal('—');

  private raf: number | null = null;

  constructor() {
    effect(() => {
      const v = this.value();
      if (v == null || !Number.isFinite(v)) {
        this.display.set('—');
        return;
      }
      this.animateTo(Math.max(0, Math.floor(v)));
    });
  }

  ngOnDestroy(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
  }

  private animateTo(target: number) {
    if (this.raf) cancelAnimationFrame(this.raf);

    const fromText = this.display();
    const from = Number(fromText.replace(/[^0-9]/g, '')) || 0;
    const start = performance.now();
    const duration = Math.max(200, this.durationMs());

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = Math.round(from + (target - from) * eased);
      this.display.set(this.formatNumber(current));
      if (t < 1) this.raf = requestAnimationFrame(tick);
    };

    this.raf = requestAnimationFrame(tick);
  }

  private formatNumber(n: number): string {
    const style = this.format();
    if (style === 'compact') return new Intl.NumberFormat(undefined, { notation: 'compact' }).format(n);
    return new Intl.NumberFormat(undefined).format(n);
  }
}

