import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { VisitorService } from './visitor.service';

@Injectable({ providedIn: 'root' })
export class VisitorTrackerService {
  private readonly router = inject(Router);
  private readonly visitors = inject(VisitorService);

  private seenFirstNav = false;

  start() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        // Home page already counts once on initial load (requirement),
        // so we skip the very first navigation event to avoid double hit.
        if (!this.seenFirstNav) {
          this.seenFirstNav = true;
          return;
        }
        void this.visitors.hitAndGetCount();
      });
  }
}

