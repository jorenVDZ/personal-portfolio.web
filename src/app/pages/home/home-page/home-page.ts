import { Component, OnInit } from '@angular/core';
import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { particlesOptions } from '../../../shared/options/particlesOptions';
import { NgxParticlesModule } from "@tsparticles/angular";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [
    NgxParticlesModule,
    TranslatePipe
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements OnInit {
  id = 'tsparticles';
  particlesOptions = particlesOptions;

  ngOnInit(): void {
    // Initialization logic if needed
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadBasic(engine);
  }
}
