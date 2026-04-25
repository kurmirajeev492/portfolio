import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PortfolioStore } from '../../../core/services/portfolio-store.service';
import { IconComponent } from '../ui/icon.component';

@Component({
  selector: 'app-footer',
  imports: [IconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  private readonly store = inject(PortfolioStore);
  readonly person = this.store.person;
  readonly social = this.store.social;
  readonly year = computed(() => new Date().getFullYear());
}

