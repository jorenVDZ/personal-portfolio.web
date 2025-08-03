import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../shared/services/translation.service';

@Component({
  selector: 'app-contact-page',
  imports: [
    TranslatePipe
  ],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss'
})
export class ContactPage {
  constructor(private translationService: TranslationService) {}

  downloadCV(): void {
    const currentLanguage = this.translationService.getCurrentLanguage();
    const link = document.createElement('a');
    link.href = `/assets/cv-${currentLanguage}.pdf`;
    link.download = `Joren_Vanderzande_CV_${currentLanguage.toUpperCase()}.pdf`;
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
