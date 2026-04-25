import { Directive, ElementRef, OnDestroy, afterNextRender, input } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnDestroy {
  readonly delayMs = input<number>(0, { alias: 'appRevealDelay' });
  readonly once = input<boolean>(true, { alias: 'appRevealOnce' });

  private io: IntersectionObserver | null = null;

  constructor(private readonly el: ElementRef<HTMLElement>) {
    const native = this.el.nativeElement;
    native.classList.add('reveal');

    afterNextRender(() => {
      this.io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) {
              if (!this.once()) native.classList.remove('is-visible');
              continue;
            }

            const delay = Math.max(0, this.delayMs());
            if (delay) native.style.transitionDelay = `${delay}ms`;
            native.classList.add('is-visible');
            if (this.once()) this.io?.disconnect();
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
      );
      this.io.observe(native);
    });
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    this.io = null;
  }
}

