import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioStore } from '../../core/services/portfolio-store.service';
import { RevealDirective } from '../../shared/components/ui/reveal.directive';

@Component({
  selector: 'app-experience-section',
  imports: [RevealDirective],
  templateUrl: './experience.section.html',
  styleUrl: './experience.section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceSection {
  private readonly store = inject(PortfolioStore);
  readonly experience = this.store.experience;
}

