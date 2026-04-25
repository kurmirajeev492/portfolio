import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PortfolioStore } from '../../core/services/portfolio-store.service';
import { TypingComponent } from '../../shared/components/ui/typing.component';
import { IconComponent } from '../../shared/components/ui/icon.component';
import { RevealDirective } from '../../shared/components/ui/reveal.directive';

@Component({
  selector: 'app-hero-section',
  imports: [NgOptimizedImage, TypingComponent, IconComponent, RevealDirective],
  templateUrl: './hero.section.html',
  styleUrl: './hero.section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSection {
  private readonly store = inject(PortfolioStore);

  readonly person = this.store.person;
  readonly social = this.store.social;

  readonly roleLine = computed(() => this.person()?.headline ?? '');

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

