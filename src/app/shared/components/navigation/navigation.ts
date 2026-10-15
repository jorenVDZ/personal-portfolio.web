import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-navigation',
  imports: [TranslatePipe],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation implements OnInit, OnDestroy {
  private readonly translation = inject(TranslationService);
  ids = ['home', 'about', 'career', 'skills', 'contact'];
  activeIndex = 0;
  isMobileMenuOpen = false;
  private observer?: IntersectionObserver;

  get currentLanguage() { return this.translation.getCurrentLanguage(); }

  ngOnInit() {
    this.observer = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) this.activeIndex = this.ids.indexOf(e.target.id);
    }), { rootMargin: '-50% 0px -50% 0px' });
    setTimeout(() => this.ids.forEach(id => { const el = document.getElementById(id); if (el) this.observer!.observe(el); }), 100);
  }
  ngOnDestroy() { this.observer?.disconnect(); }

  scrollTo(id: string) {
    this.isMobileMenuOpen = false;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
  toggleLanguage() { this.translation.setLanguage(this.currentLanguage === 'en' ? 'nl' : 'en'); }
}
