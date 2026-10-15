import { Component, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TechnologiesService, TechnologyCategory } from '../../../shared/services/technologies.service';
import { Scrolly } from '../../../shared/components/scrolly/scrolly';

@Component({
  selector: 'app-skills-page',
  imports: [TranslatePipe, Scrolly, NgTemplateOutlet],
  templateUrl: './skills-page.html',
})
export class SkillsPage {
  tech = inject(TechnologiesService).getTechnologiesGroupedByCategory();
  categories = [TechnologyCategory.FRONTEND, TechnologyCategory.BACKEND, TechnologyCategory.CLOUD, TechnologyCategory.TESTING]
    .map(key => ({ key }));
  i = signal(0);

  techOf(key: TechnologyCategory) { return this.tech[key]; }
  names(key: TechnologyCategory): string { return this.tech[key].map(t => t.name).join(' · '); }
}
