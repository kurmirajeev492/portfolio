import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioStore } from '../../core/services/portfolio-store.service';
import { RevealDirective } from '../../shared/components/ui/reveal.directive';

@Component({
  selector: 'app-skills-section',
  imports: [RevealDirective],
  templateUrl: './skills.section.html',
  styleUrl: './skills.section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsSection {
  private readonly store = inject(PortfolioStore);
  readonly skills = this.store.skills;
}

