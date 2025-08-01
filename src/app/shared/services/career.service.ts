import { Injectable } from '@angular/core';
import { TechnologiesService, Technology } from './technologies.service';

export interface CareerEvent {
  titleKey: string;
  subtitleKey: string;
  dateStart: Date;
  dateEnd?: Date;
  descriptionKey: string;
  type: CareerEventType;
  icon?: string;
  location?: string;
  projects?: Project[];
}

export interface Project {
  titleKey: string;
  descriptionKey: string;
  dateStart: Date;
  dateEnd?: Date;
  technologies?: string[]; // Technology names that match the TechnologiesService
}

export enum CareerEventType {
  EDUCATION = 'education',
  WORK = 'work',
  PROJECT = 'project',
  CERTIFICATION = 'certification'
}

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  constructor(private technologiesService: TechnologiesService) {}

  private readonly careerEvents: CareerEvent[] = [
    {
      titleKey: 'career.education.title',
      subtitleKey: 'career.education.institution',
      dateStart: new Date(2017, 8),
      dateEnd: new Date(2021, 5),
      descriptionKey: 'career.education.description',
      type: CareerEventType.EDUCATION,
      icon: 'pi pi-graduation-cap',
      location: 'Hasselt, Belgium',
    },
    {
      titleKey: 'career.work.title',
      subtitleKey: 'career.work.company',
      dateStart: new Date(2021, 6),
      descriptionKey: 'career.work.description',
      type: CareerEventType.WORK,
      icon: 'pi pi-briefcase',
      location: 'Belgium',
      projects: [
        {
          titleKey: 'career.project.bankingAppRestaurantBooking.title',
          descriptionKey: 'career.project.bankingAppRestaurantBooking.description',
          dateStart: new Date(2021, 7),
          dateEnd: new Date(2021, 9),
          technologies: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'SASS', 'RxJS', 'Cypress', 'Karma']
        },
        {
          titleKey: 'career.project.creditPortal.title',
          descriptionKey: 'career.project.creditPortal.description',
          dateStart: new Date(2021, 9),
          dateEnd: new Date(2024, 4),
          technologies: ['Angular', 'TypeScript', '.NET', 'Entity Framework Core', 'Application Insights', 'Azure DevOps Pipelines', 'HTML5', 'CSS3', 'SASS', 'RxJS', 'Karma']
        },
        {
          titleKey: 'career.project.publicMunicipality.title',
          descriptionKey: 'career.project.publicMunicipality.description',
          dateStart: new Date(2022, 10),
          dateEnd: new Date(2024, 4),
          technologies: ['.NET', 'Azure DevOps Pipelines', 'Azure Functions', 'Azure Logic Apps']
        },
        {
          titleKey: 'career.project.mockWms.title',
          descriptionKey: 'career.project.mockWms.description',
          dateStart: new Date(2022, 7),
          dateEnd: new Date(2023, 4),
          technologies: ['Angular', 'TypeScript', '.NET', 'Entity Framework Core', 'HTML5', 'CSS3', 'SASS', 'RxJS', 'Cypress', 'Karma']
        },
        {
          titleKey: 'career.project.cmsDashboard.title',
          descriptionKey: 'career.project.cmsDashboard.description',
          dateStart: new Date(2023, 5),
          dateEnd: new Date(2024, 4),
          technologies: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'SASS']
        },
        {
          titleKey: 'career.project.publicAdminPortal.title',
          descriptionKey: 'career.project.publicAdminPortal.description',
          dateStart: new Date(2024, 4),
          technologies: ['Angular', 'TypeScript', '.NET', 'GraphQL (HotChocolate)', 'MartenDB', 'Azure Kubernetes Service (AKS)', 'Microsoft Entra ID', 'HTML5', 'CSS3', 'SASS', 'RxJS']
        },
      ]
    }
  ];

  getAllCareerEvents(): CareerEvent[] {
    return [...this.careerEvents].sort((a, b) => {
      return b.dateStart.getTime() - a.dateStart.getTime();
    });
  }

  getCareerEventsByType(type: CareerEventType): CareerEvent[] {
    return this.careerEvents
      .filter(event => event.type === type)
      .sort((a, b) => b.dateStart.getTime() - a.dateStart.getTime());
  }

  getCareerEventsGroupedByType(): { [key in CareerEventType]: CareerEvent[] } {
    const grouped = {} as { [key in CareerEventType]: CareerEvent[] };

    Object.values(CareerEventType).forEach(type => {
      grouped[type] = [];
    });

    this.careerEvents.forEach(event => {
      grouped[event.type].push(event);
    });

    Object.values(CareerEventType).forEach(type => {
      grouped[type].sort((a, b) => b.dateStart.getTime() - a.dateStart.getTime());
    });

    return grouped;
  }

  getCareerEventTypes(): CareerEventType[] {
    return Object.values(CareerEventType);
  }

  getCurrentCareerEvent(): CareerEvent | undefined {
    return this.careerEvents
      .filter(event => !event.dateEnd)
      .sort((a, b) => b.dateStart.getTime() - a.dateStart.getTime())[0];
  }

  getCareerEventsInDateRange(startDate: Date, endDate: Date): CareerEvent[] {
    return this.careerEvents.filter(event => {
      const eventStart = event.dateStart;
      const eventEnd = event.dateEnd || new Date();

      return eventStart <= endDate && eventEnd >= startDate;
    });
  }

  getTotalExperienceYears(): number {
    const workEvents = this.getCareerEventsByType(CareerEventType.WORK);
    if (workEvents.length === 0) return 0;

    const firstWorkEvent = workEvents[workEvents.length - 1];
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - firstWorkEvent.dateStart.getTime());
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365.25));

    return diffYears;
  }

  formatDateRange(event: CareerEvent): string {
    const startDate = event.dateStart;
    const endDate = event.dateEnd;

    const formatOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long'
    };

    const startFormatted = startDate.toLocaleDateString('en-US', formatOptions);
    const endFormatted = endDate
      ? endDate.toLocaleDateString('en-US', formatOptions)
      : 'Present';

    return `${startFormatted} - ${endFormatted}`;
  }

  getDurationInMonths(event: CareerEvent): number {
    const start = event.dateStart;
    const end = event.dateEnd || new Date();

    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();

    return yearDiff * 12 + monthDiff;
  }

  formatDuration(event: CareerEvent): string {
    const months = this.getDurationInMonths(event);
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  }

  // Technology-related methods
  getProjectTechnologies(project: Project): Technology[] {
    if (!project.technologies) return [];

    return project.technologies
      .map(techName => this.technologiesService.getTechnology(techName))
      .filter((tech): tech is Technology => tech !== undefined);
  }

  getAllProjectTechnologies(): Technology[] {
    const allTechNames = new Set<string>();

    this.careerEvents.forEach(event => {
      event.projects?.forEach(project => {
        project.technologies?.forEach(techName => {
          allTechNames.add(techName);
        });
      });
    });

    return Array.from(allTechNames)
      .map(techName => this.technologiesService.getTechnology(techName))
      .filter((tech): tech is Technology => tech !== undefined);
  }

  getProjectsByTechnology(technologyName: string): Project[] {
    const projects: Project[] = [];

    this.careerEvents.forEach(event => {
      event.projects?.forEach(project => {
        if (project.technologies?.includes(technologyName)) {
          projects.push(project);
        }
      });
    });

    return projects.sort((a, b) => b.dateStart.getTime() - a.dateStart.getTime());
  }

  getTechnologyUsageCount(technologyName: string): number {
    return this.getProjectsByTechnology(technologyName).length;
  }
}
