import { Component, ElementRef, OnDestroy, afterNextRender, inject, input, output } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned scrollytelling (desktop >= lg). The chapter is `count` viewports tall; its content is
 * sticky for the whole range. Scroll progress picks the active step (free scrolling, no snapping).
 * Mobile: plain stacked flow, no pinning, no triggers.
 */
@Component({
  selector: 'app-scrolly',
  template: `
    <div class="scrolly" [style.--n]="count()">
      <div class="scrolly-pin">
        <div class="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <ng-content select="[head]" />
            <div class="timeline"><ng-content /></div>
          </div>
          <div class="hidden lg:block"><div class="panel"><ng-content select="[panel]" /></div></div>
        </div>
      </div>
    </div>`,
})
export class Scrolly implements OnDestroy {
  count = input.required<number>();
  activeChange = output<number>();
  private host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private mm?: gsap.MatchMedia;

  constructor() {
    afterNextRender(() => {
      const scroller = this.host.closest<HTMLElement>('.overflow-y-scroll') ?? undefined;
      const panel = this.host.querySelector('.panel');
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const n = this.count();
      let current = -1;
      const set = (self: ScrollTrigger) => {
        const i = Math.min(n - 1, Math.max(0, Math.round(self.progress * (n - 1))));
        if (i === current) return;
        current = i;
        this.activeChange.emit(i);
        if (!reduce && panel) gsap.fromTo(panel, { opacity: 0.3, y: 24 * (self.direction || 1) }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', overwrite: true });
      };
      this.mm = gsap.matchMedia();
      this.mm.add('(min-width: 1024px)', () => {
        const st = ScrollTrigger.create({
          trigger: this.host.querySelector('.scrolly')!, scroller,
          start: 'top top', end: 'bottom bottom',
          onUpdate: set, onRefresh: set,
        });
        return () => st?.kill();
      });
      setTimeout(() => ScrollTrigger.refresh(), 500); // images/fonts settle
    });
  }
  ngOnDestroy() { this.mm?.revert(); }
}
