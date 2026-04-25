import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PortfolioStore } from '../../core/services/portfolio-store.service';
import { RevealDirective } from '../../shared/components/ui/reveal.directive';

@Component({
  selector: 'app-about-section',
  imports: [NgOptimizedImage, RevealDirective],
  templateUrl: './about.section.html',
  styleUrl: './about.section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutSection {
  private readonly store = inject(PortfolioStore);
  readonly about = this.store.about;
  readonly person = this.store.person;
}

