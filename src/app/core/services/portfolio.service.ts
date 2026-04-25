import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { PortfolioData } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly http = inject(HttpClient);
  private readonly portfolio$ = this.http
    .get<PortfolioData>('assets/data/portfolio.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));

  getPortfolio(): Observable<PortfolioData> {
    return this.portfolio$;
  }
}

