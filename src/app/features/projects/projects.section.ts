import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PortfolioStore } from '../../core/services/portfolio-store.service';
import { RevealDirective } from '../../shared/components/ui/reveal.directive';
import { TiltDirective } from '../../shared/components/ui/tilt.directive';

@Component({
  selector: 'app-projects-section',
  imports: [NgOptimizedImage, RevealDirective, TiltDirective],
  templateUrl: './projects.section.html',
  styleUrl: './projects.section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsSection {
  private readonly store = inject(PortfolioStore);
  readonly projects = this.store.projects;
}

