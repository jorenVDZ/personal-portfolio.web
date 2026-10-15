import { Component, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CareerEventType, CareerService } from '../../../shared/services/career.service';
import { Technology } from '../../../shared/services/technologies.service';
import { Scrolly } from '../../../shared/components/scrolly/scrolly';

interface Step { title: string; sub?: string; start: Date; end?: Date; desc: string; techs: Technology[] }

@Component({
  selector: 'app-career-page',
  imports: [TranslatePipe, Scrolly, NgTemplateOutlet],
  templateUrl: './career-page.html',
})
export class CareerPage {
  private career = inject(CareerService);
  private translate = inject(TranslateService);
  i = signal(0);
  steps: Step[];

  constructor() {
    const work = this.career.getCareerEventsByType(CareerEventType.WORK)[0];
    const edu = this.career.getCareerEventsByType(CareerEventType.EDUCATION)[0];
    this.steps = [
      { title: work.titleKey, sub: work.subtitleKey, start: work.dateStart, end: work.dateEnd, desc: work.descriptionKey, techs: [] },
      ...[...(work.projects ?? [])].sort((a, b) => b.dateStart.getTime() - a.dateStart.getTime()).map(p => ({
        title: p.titleKey, start: p.dateStart, end: p.dateEnd, desc: p.descriptionKey, techs: this.career.getProjectTechnologies(p),
      })),
      { title: edu.titleKey, sub: edu.subtitleKey, start: edu.dateStart, end: edu.dateEnd, desc: edu.descriptionKey, techs: [] },
    ];
  }

  // method (not a field) so it follows the language switch
  period(s: Step): string {
    const lang = this.translate.currentLang || 'en';
    const f = (d: Date) => d.toLocaleDateString(lang, { year: 'numeric', month: 'short' });
    return `${f(s.start)} – ${s.end ? f(s.end) : this.translate.instant('career.present')}`;
  }
}
