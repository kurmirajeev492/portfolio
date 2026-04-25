import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { NgClass } from '@angular/common';
import { PortfolioStore } from '../../../core/services/portfolio-store.service';
import { VisitorService } from '../../../core/services/visitor.service';
import { IconComponent } from '../ui/icon.component';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, IconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private readonly store = inject(PortfolioStore);
  private readonly visitors = inject(VisitorService);

  readonly nav = this.store.nav;
  readonly person = this.store.person;
  readonly visitorCount = this.visitors.count;
  readonly visitorTitle = computed(() => {
    const v = this.visitorCount();
    if (v == null) return 'Visitors';
    return `Visitors: ${new Intl.NumberFormat(undefined).format(v)}`;
  });

  readonly scrolled = signal(false);
  readonly activeId = signal<string>('home');

  readonly brand = computed(() => this.person()?.name ?? 'Portfolio');

  private io: IntersectionObserver | null = null;

  constructor() {
    effect(() => {
      const items = this.nav();
      queueMicrotask(() => this.setupScrollSpy(items.map((x) => x.id)));
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 12);
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private setupScrollSpy(ids: string[]) {
    this.io?.disconnect();

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((x): x is HTMLElement => !!x);

    if (!targets.length) return;

    this.io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        const id = visible?.target?.id;
        if (id) this.activeId.set(id);
      },
      { root: null, threshold: [0.15, 0.25, 0.4], rootMargin: '-15% 0px -70% 0px' }
    );

    for (const t of targets) this.io.observe(t);
  }
}

