import { Component } from '@angular/core';
import { AboutPage } from '../../about/about-page/about-page';
import { ContactPage } from '../../contact/contact-page/contact-page';
import { HomePage } from '../../home/home-page/home-page';
import { ProjectsPage } from '../../projects/projects-page/projects-page';
import { SkillsPage } from '../../skills/skills-page/skills-page';
import { Navigation } from '../../../shared/components/navigation/navigation';

@Component({
  selector: 'app-main-page',
  imports: [
    HomePage,
    AboutPage,
    ProjectsPage,
    SkillsPage,
    ContactPage,
    Navigation
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss'
})
export class MainPage {

}
