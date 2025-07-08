import { loadBasic } from '@tsparticles/basic';
import { Component } from '@angular/core';
import { AboutPage } from './pages/about/about-page/about-page';
import { ContactPage } from './pages/contact/contact-page/contact-page';
import { HomePage } from './pages/home/home-page/home-page';
import { ProjectsPage } from './pages/projects/projects-page/projects-page';
import { SkillsPage } from './pages/skills/skills-page/skills-page';
import { Navigation } from './shared/components/navigation/navigation';
import { particlesOptions } from './shared/options/particlesOptions';
import { Engine } from '@tsparticles/engine';
import { NgxParticlesModule } from "@tsparticles/angular";

@Component({
  selector: 'app-root',
  imports: [
    HomePage,
    AboutPage,
    ProjectsPage,
    SkillsPage,
    ContactPage,
    Navigation,
    NgxParticlesModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  id = 'tsparticles';
  particlesOptions = particlesOptions;


  async particlesInit(engine: Engine): Promise<void> {
    await loadBasic(engine);
  }
}
