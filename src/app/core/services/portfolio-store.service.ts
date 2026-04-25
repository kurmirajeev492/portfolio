import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { PortfolioService } from './portfolio.service';
import { PortfolioData } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  private readonly api = inject(PortfolioService);

  readonly data = toSignal(this.api.getPortfolio().pipe(startWith(null)), { initialValue: null });

  readonly person = computed(() => this.data()?.person ?? null);
  readonly nav = computed(() => this.data()?.nav ?? []);
  readonly social = computed(() => this.data()?.social ?? []);
  readonly about = computed(() => this.data()?.about ?? null);
  readonly skills = computed(() => this.data()?.skills ?? null);
  readonly experience = computed(() => this.data()?.experience ?? []);
  readonly projects = computed(() => this.data()?.projects ?? []);
  readonly contact = computed(() => this.data()?.contact ?? null);
  readonly meta = computed(() => this.data()?.meta ?? null);
}

