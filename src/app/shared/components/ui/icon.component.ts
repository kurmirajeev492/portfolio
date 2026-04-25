import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type IconName = 'github' | 'linkedin' | 'x' | 'dribbble' | 'mail' | 'phone';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly title = computed(() => this.name());
}

