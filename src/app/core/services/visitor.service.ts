import { Injectable, signal } from '@angular/core';

type CountApiHitResponse = { value: number } | { error: string };

@Injectable({ providedIn: 'root' })
export class VisitorService {
  readonly count = signal<number | null>(null);
  readonly status = signal<'idle' | 'loading' | 'ready' | 'error'>('idle');

  private readonly endpoint = 'https://portfolio-rajeevkurmi.netlify.app/';
  private readonly timeoutMs = 6500;

  async hitAndGetCount(): Promise<number | null> {
    this.status.set('loading');

    try {
      const ctrl = new AbortController();
      const t = window.setTimeout(() => ctrl.abort(), this.timeoutMs);

      const res = await fetch(this.endpoint, {
        method: 'GET',
        headers: { accept: 'application/json' },
        cache: 'no-store',
        signal: ctrl.signal
      });

      window.clearTimeout(t);

      if (!res.ok) throw new Error(`CountAPI failed: ${res.status}`);

      const data = (await res.json()) as CountApiHitResponse;
      if (!('value' in data) || typeof data.value !== 'number') throw new Error('CountAPI invalid response');

      this.count.set(data.value);
      this.status.set('ready');
      return data.value;
    } catch {
      // Graceful fallback: keep previous count if any
      this.status.set('error');
      return this.count();
    }
  }
}

