import { Component, OnInit } from '@angular/core';
import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { particlesOptions } from '../../../shared/options/particlesOptions';
import { NgxParticlesModule } from "@tsparticles/angular";

@Component({
  selector: 'app-home-page',
  imports: [
    NgxParticlesModule
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements OnInit {

  id = 'tsparticles';
  particlesOptions = particlesOptions;

  constructor() {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadBasic(engine);
  }
}
