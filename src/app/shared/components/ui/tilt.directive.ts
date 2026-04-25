import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {
  readonly max = input<number>(10, { alias: 'appTiltMax' });
  readonly scale = input<number>(1.03, { alias: 'appTiltScale' });

  constructor(private readonly el: ElementRef<HTMLElement>) {
    const n = this.el.nativeElement;
    n.style.transformStyle = 'preserve-3d';
    n.style.willChange = 'transform';
    n.style.transition = 'transform 250ms ease';
  }

  @HostListener('mousemove', ['$event'])
  onMove(ev: MouseEvent) {
    const n = this.el.nativeElement;
    const r = n.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width;
    const y = (ev.clientY - r.top) / r.height;
    const rx = (0.5 - y) * this.max();
    const ry = (x - 0.5) * this.max();
    n.style.transition = 'transform 80ms ease';
    n.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${this.scale()})`;
  }

  @HostListener('mouseleave')
  onLeave() {
    const n = this.el.nativeElement;
    n.style.transition = 'transform 250ms ease';
    n.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  }
}

