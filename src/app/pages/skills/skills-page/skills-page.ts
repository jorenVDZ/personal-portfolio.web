import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { TechnologiesService, Technology, TechnologyCategory } from '../../../shared/services/technologies.service';

@Component({
  selector: 'app-skills-page',
  imports: [CommonModule, TranslatePipe, TooltipModule],
  templateUrl: './skills-page.html',
  styleUrl: './skills-page.scss'
})
export class SkillsPage {
  technologiesGrouped: { [key in TechnologyCategory]: Technology[] };
  categoryOrder: TechnologyCategory[] = [
    TechnologyCategory.FRONTEND,
    TechnologyCategory.BACKEND,
    TechnologyCategory.CLOUD,
    TechnologyCategory.TESTING
  ];

  categoryLabels: { [key in TechnologyCategory]: string } = {
    [TechnologyCategory.FRONTEND]: 'skills.categories.frontend',
    [TechnologyCategory.BACKEND]: 'skills.categories.backend',
    [TechnologyCategory.CLOUD]: 'skills.categories.cloud',
    [TechnologyCategory.TESTING]: 'skills.categories.testing'
  };

  proficiencyColors: { [key: string]: string } = {
    'beginner': 'bg-yellow-100 text-yellow-800',
    'intermediate': 'bg-blue-100 text-blue-800',
    'advanced': 'bg-green-100 text-green-800',
    'expert': 'bg-purple-100 text-purple-800'
  };

  constructor(private technologiesService: TechnologiesService) {
    this.technologiesGrouped = this.technologiesService.getTechnologiesGroupedByCategory();
  }

  getProficiencyColor(proficiency: string): string {
    return this.proficiencyColors[proficiency] || 'bg-gray-100 text-gray-800';
  }

  getProficiencyTranslationKey(proficiency: string): string {
    return `skills.proficiency.${proficiency}`;
  }

  getTooltipTranslationKey(tech: Technology): string {
    if (tech.descriptionKey) {
      return tech.descriptionKey;
    }
    return '';
  }
}
