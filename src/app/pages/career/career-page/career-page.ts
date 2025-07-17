import { Component } from '@angular/core';

interface CareerEvent {
  titleKey: string;
  subtitleKey: string;
  dateStart: Date;
  dateEnd?: Date;
  icon: string;
  color: string;
  descriptionKey: string;
}

@Component({
  selector: 'app-career-page',
  imports: [],
  templateUrl: './career-page.html',
  styleUrl: './career-page.scss'
})
export class CareerPage {
  events: CareerEvent[] = [
    {
      titleKey: 'career.education.title',
      subtitleKey: 'career.education.institution',
      dateStart: new Date('2017-09-01'),
      dateEnd: new Date('2021-06-30'),
      icon: 'pi pi-graduation-cap',
      color: '#10B981',
      descriptionKey: 'career.education.description'
    },
    {
      titleKey: 'career.work.title',
      subtitleKey: 'career.work.company',
      dateStart: new Date('2021-07-01'),
      icon: 'pi pi-briefcase',
      color: '#059669',
      descriptionKey: 'career.work.description'
    }
  ];
}
