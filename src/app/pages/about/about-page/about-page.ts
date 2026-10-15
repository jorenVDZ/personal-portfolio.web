import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Scrolly } from '../../../shared/components/scrolly/scrolly';

@Component({
  selector: 'app-about-page',
  imports: [TranslatePipe, Scrolly],
  templateUrl: './about-page.html',
})
export class AboutPage {
  steps = ['s1', 's2', 's3'];
  // photo per step; position keeps the people in frame when cropped
  photos = [
    { src: 'assets/profile-image.jpg', pos: 'center 30%' },
    { src: 'assets/Magic.jpg', pos: 'center 45%' },
    { src: 'assets/kayaking.jpg', pos: 'center 45%' },
  ];
  i = signal(0);
  constructor() { this.photos.forEach(p => (new Image().src = p.src)); } // preload so swaps don't wait on the network
}
