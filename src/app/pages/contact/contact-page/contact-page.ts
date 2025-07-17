import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-page',
  imports: [
    TranslatePipe
  ],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss'
})
export class ContactPage {
  downloadCV(): void {
    const link = document.createElement('a');
    link.href = '/assets/cv.pdf';
    link.download = 'Joren_Vanderzande_CV.pdf';
    link.click();
  }

  openEmail(): void {
    const email = 'joren.vanderzande@gmail.com';
    window.location.href = `mailto:${email}`;
  }

  openLinkedIn(): void {
    const linkedinUrl = 'https://www.linkedin.com/in/joren-vanderzande-b9a931175';
    window.open(linkedinUrl, '_blank');
  }
}
