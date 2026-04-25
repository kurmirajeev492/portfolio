import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PortfolioStore } from './core/services/portfolio-store.service';
import { VisitorTrackerService } from './core/services/visitor-tracker.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly store = inject(PortfolioStore);
  private readonly title = inject(Title);
  private readonly visitorTracker = inject(VisitorTrackerService);

  constructor() {
    this.visitorTracker.start();
    effect(() => {
      const meta = this.store.meta();
      if (meta?.siteTitle) this.title.setTitle(meta.siteTitle);
    });
  }
}
