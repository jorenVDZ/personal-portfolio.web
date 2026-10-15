import { Component, ElementRef, OnDestroy, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

const CHAPTERS = ['home', 'about', 'career', 'skills', 'contact'];

/** Right-edge dot rail (desktop) / top bar (mobile). Active chapter tracked via IntersectionObserver. */
@Component({
  selector: 'app-progress-rail',
  imports: [TranslatePipe],
  template: `
    <div class="fixed top-0 left-0 h-1 bg-emerald-400 z-30 md:hidden transition-[width] duration-300"
         [style.width.%]="((active() + 1) / chapters.length) * 100"></div>
    <nav class="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-4" aria-label="Chapters">
      @for (id of chapters; track id; let i = $index) {
        <button type="button" class="group relative flex items-center justify-end" (click)="go(id)"
                [attr.aria-label]="'navigation.' + id | translate" [attr.aria-current]="active() === i">
          <span class="absolute right-6 whitespace-nowrap text-xs uppercase tracking-wide text-slate-300 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
            {{ 'navigation.' + id | translate }}
          </span>
          <span class="block w-3 h-3 rounded-full border transition-colors"
                [class]="active() === i ? 'bg-emerald-400 border-emerald-400' : 'border-slate-700 bg-transparent'"></span>
        </button>
      }
    </nav>`,
})
export class ProgressRail implements OnInit, OnDestroy {
  chapters = CHAPTERS;
  active = signal(0);
  private io?: IntersectionObserver;

  ngOnInit() {
    this.io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && this.active.set(CHAPTERS.indexOf(e.target.id))),
      { rootMargin: '-50% 0px -50% 0px' });
    // ponytail: sections exist once app view is rendered; defer one tick
    setTimeout(() => CHAPTERS.forEach(id => { const el = document.getElementById(id); if (el) this.io!.observe(el); }));
  }
  ngOnDestroy() { this.io?.disconnect(); }
  go(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
}
