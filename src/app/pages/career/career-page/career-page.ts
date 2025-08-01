import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { CareerService, CareerEvent, CareerEventType } from '../../../shared/services/career.service';

@Component({
  selector: 'app-career-page',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './career-page.html',
  styleUrl: './career-page.scss'
})
export class CareerPage {
  careerEventsGrouped: { [key in CareerEventType]: CareerEvent[] };
  eventTypeOrder: CareerEventType[] = [
    CareerEventType.WORK,
    CareerEventType.EDUCATION,
    CareerEventType.PROJECT,
    CareerEventType.CERTIFICATION
  ];

  eventTypeLabels: { [key in CareerEventType]: string } = {
    [CareerEventType.WORK]: 'career.types.work',
    [CareerEventType.EDUCATION]: 'career.types.education',
    [CareerEventType.PROJECT]: 'career.types.project',
    [CareerEventType.CERTIFICATION]: 'career.types.certification'
  };

  constructor(private careerService: CareerService) {
    this.careerEventsGrouped = this.careerService.getCareerEventsGroupedByType();
  }

  formatDateRange(event: CareerEvent): string {
    return this.careerService.formatDateRange(event);
  }

  formatDuration(event: CareerEvent): string {
    return this.careerService.formatDuration(event);
  }

  getTotalExperienceYears(): number {
    return this.careerService.getTotalExperienceYears();
  }

  hasEventsOfType(type: CareerEventType): boolean {
    return this.careerEventsGrouped[type].length > 0;
  }
}
