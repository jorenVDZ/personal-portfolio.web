import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { CareerService, CareerEvent, CareerEventType, Project } from '../../../shared/services/career.service';
import { TechnologiesService, Technology } from '../../../shared/services/technologies.service';
import { DrawerModule } from 'primeng/drawer';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';

@Component({
  selector: 'app-career-page',
  imports: [CommonModule, TranslatePipe, DrawerModule, ChipModule, ButtonModule, SharedModule],
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

  // Drawer state
  isDrawerVisible: boolean = false;
  selectedEventProjects: Project[] = [];
  selectedEventTitle: string = '';
  selectedEventCompany: string = '';

  constructor(
    private careerService: CareerService,
    private technologiesService: TechnologiesService
  ) {
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

  // Drawer methods
  hasProjects(event: CareerEvent): boolean {
    return !!(event.projects && event.projects.length > 0);
  }

  openProjectsDrawer(event: CareerEvent): void {
    if (event.projects) {
      this.selectedEventProjects = event.projects;
      this.selectedEventTitle = event.titleKey;
      this.selectedEventCompany = event.subtitleKey;
      this.isDrawerVisible = true;
    }
  }

  closeDrawer(): void {
    this.isDrawerVisible = false;
    this.selectedEventProjects = [];
    this.selectedEventTitle = '';
    this.selectedEventCompany = '';
  }

  getProjectTechnologies(project: Project): Technology[] {
    return this.careerService.getProjectTechnologies(project);
  }

  formatProjectDateRange(project: Project): string {
    const startDate = project.dateStart;
    const endDate = project.dateEnd;

    const formatOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short'
    };

    const startFormatted = startDate.toLocaleDateString('en-US', formatOptions);
    const endFormatted = endDate
      ? endDate.toLocaleDateString('en-US', formatOptions)
      : 'Present';

    return `${startFormatted} - ${endFormatted}`;
  }
}
