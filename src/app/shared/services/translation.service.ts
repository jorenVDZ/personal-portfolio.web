import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly LANGUAGE_KEY = 'portfolio-language';
  private readonly SUPPORTED_LANGUAGES = ['en', 'nl'];
  private readonly DEFAULT_LANGUAGE = 'en';

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    // Get saved language or detect browser language
    const savedLanguage = localStorage.getItem(this.LANGUAGE_KEY);
    const browserLanguage = this.getBrowserLanguage();

    const languageToUse = savedLanguage || browserLanguage || this.DEFAULT_LANGUAGE;

    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    this.setLanguage(languageToUse);
  }

  private getBrowserLanguage(): string {
    const browserLang = this.translate.getBrowserLang();
    return this.SUPPORTED_LANGUAGES.includes(browserLang || '') ? browserLang! : this.DEFAULT_LANGUAGE;
  }

  setLanguage(language: string): void {
    if (this.SUPPORTED_LANGUAGES.includes(language)) {
      this.translate.use(language);
      localStorage.setItem(this.LANGUAGE_KEY, language);
    }
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.DEFAULT_LANGUAGE;
  }

  getSupportedLanguages(): string[] {
    return [...this.SUPPORTED_LANGUAGES];
  }

  getTranslation(key: string): string {
    return this.translate.instant(key);
  }
}
