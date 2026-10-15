import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../shared/services/translation.service';

@Component({
  selector: 'app-contact-page',
  imports: [TranslatePipe],
  templateUrl: './contact-page.html',
})
export class ContactPage {
  email = 'jorenvanderzande@hotmail.com';
  private translation = inject(TranslationService);
  get lang() { return this.translation.getCurrentLanguage(); }
  copied = signal(false);

  copy() {
    navigator.clipboard.writeText(this.email);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
  go(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
}
