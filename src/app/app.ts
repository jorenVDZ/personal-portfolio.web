import { Component } from '@angular/core';
import { AboutPage } from './pages/about/about-page/about-page';
import { ContactPage } from './pages/contact/contact-page/contact-page';
import { HomePage } from './pages/home/home-page/home-page';
import { ProjectsPage } from './pages/projects/projects-page/projects-page';
import { SkillsPage } from './pages/skills/skills-page/skills-page';
import { Navigation } from './shared/components/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [
    HomePage,
    AboutPage,
    ProjectsPage,
    SkillsPage,
    ContactPage,
    Navigation
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
