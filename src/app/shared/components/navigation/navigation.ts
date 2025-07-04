import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  icon: string;
  command: () => void;
}

@Component({
  selector: 'app-navigation',
  imports: [
    CommonModule
  ],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation implements OnInit, OnDestroy {
  items: NavItem[] = [];
  activeIndex: number = 0;
  isMobileMenuOpen: boolean = false;
  private observer: IntersectionObserver | null = null;
  private sectionIds = ['home', 'about', 'projects', 'skills', 'contact'];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.scrollTo('home')
      },
      {
        label: 'About',
        icon: 'pi pi-user',
        command: () => this.scrollTo('about')
      },
      {
        label: 'Projects',
        icon: 'pi pi-briefcase',
        command: () => this.scrollTo('projects')
      },
      {
        label: 'Skills',
        icon: 'pi pi-cog',
        command: () => this.scrollTo('skills')
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        command: () => this.scrollTo('contact')
      }
    ];

    // Setup intersection observer after a brief delay to ensure DOM is ready
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
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is 50% visible
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

    // Observe all sections
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
}
