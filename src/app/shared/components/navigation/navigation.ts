import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';

interface NavItem {
  label: string;
  translationKey: string;
  icon: string;
  command: () => void;
}

@Component({
  selector: 'app-navigation',
  imports: [
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation implements OnInit, OnDestroy {
  private readonly _translationService = inject(TranslationService);

  items: NavItem[] = [];
  activeIndex: number = 0;
  isMobileMenuOpen: boolean = false;
  currentLanguage: string = 'en';
  private observer: IntersectionObserver | null = null;
  private sectionIds = ['home', 'about', 'career', 'skills', 'contact'];

  ngOnInit() {
    this.currentLanguage = this._translationService.getCurrentLanguage();

    this.items = [
      {
        label: 'Home',
        translationKey: 'navigation.home',
        icon: 'pi pi-home',
        command: () => this.scrollTo('home')
      },
      {
        label: 'About',
        translationKey: 'navigation.about',
        icon: 'pi pi-user',
        command: () => this.scrollTo('about')
      },
      {
        label: 'Career',
        translationKey: 'navigation.career',
        icon: 'pi pi-briefcase',
        command: () => this.scrollTo('career')
      },
      {
        label: 'Skills',
        translationKey: 'navigation.skills',
        icon: 'pi pi-cog',
        command: () => this.scrollTo('skills')
      },
      {
        label: 'Contact',
        translationKey: 'navigation.contact',
        icon: 'pi pi-envelope',
        command: () => this.scrollTo('contact')
      }
    ];

    setTimeout(() => {
      this.setupIntersectionObserver();
    }, 100);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const index = this.sectionIds.indexOf(sectionId);
          if (index !== -1) {
            this.activeIndex = index;
          }
        }
      });
    }, options);

    this.sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        this.observer!.observe(element);
      } else {
        console.warn(`Section with id '${id}' not found`);
      }
    });
  }

  scrollTo(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  selectItem(item: NavItem, index: number) {
    this.activeIndex = index;
    this.isMobileMenuOpen = false;
    item.command();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  switchLanguage(language: string) {
    this._translationService.setLanguage(language);
    this.currentLanguage = language;
  }

  toggleLanguage() {
    const newLanguage = this.currentLanguage === 'en' ? 'nl' : 'en';
    this.switchLanguage(newLanguage);
  }
}
