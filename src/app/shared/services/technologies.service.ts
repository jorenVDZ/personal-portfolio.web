import { Injectable } from '@angular/core';

export interface Technology {
  name: string;
  icon: string;
  category: TechnologyCategory;
  proficiency: ProficiencyLevel;
  descriptionKey?: string;
}

export enum TechnologyCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  CLOUD = 'cloud',
  TESTING = 'testing'
}

export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

@Injectable({
  providedIn: 'root'
})
export class TechnologiesService {
  private readonly technologies: Technology[] = [
    // --- Frontend Technologies ---
    {
      name: 'Angular',
      icon: 'assets/technologies/angular.png',
      category: TechnologyCategory.FRONTEND,
      proficiency: ProficiencyLevel.ADVANCED,
      descriptionKey: 'technologies.frontend.angular'
    },
    {
      name: 'TypeScript',
      icon: 'assets/technologies/typescript.png',
      category: TechnologyCategory.FRONTEND,
      proficiency: ProficiencyLevel.ADVANCED,
      descriptionKey: 'technologies.frontend.typescript'
    },
    {
      name: 'HTML5',
      icon: 'assets/technologies/hml5.png',
      category: TechnologyCategory.FRONTEND,
      proficiency: ProficiencyLevel.EXPERT,
      descriptionKey: 'technologies.frontend.html5'
    },
    {
      name: 'CSS3',
      icon: 'assets/technologies/css3.png',
      category: TechnologyCategory.FRONTEND,
      proficiency: ProficiencyLevel.ADVANCED,
      descriptionKey: 'technologies.frontend.css3'
    },
    {
      name: 'SASS',
      icon: 'assets/technologies/sass.png',
      category: TechnologyCategory.FRONTEND,
      proficiency: ProficiencyLevel.ADVANCED,
      descriptionKey: 'technologies.frontend.sass'
    },
    {
      name: 'RxJS',
      icon: 'assets/technologies/rxjs.png',
      category: TechnologyCategory.FRONTEND,
      proficiency: ProficiencyLevel.ADVANCED,
      descriptionKey: 'technologies.frontend.rxjs'
    },

    // --- Backend Technologies (.NET Stack) ---
    {
      name: '.NET',
      icon: 'assets/technologies/dotnet.png',
      category: TechnologyCategory.BACKEND,
      proficiency: ProficiencyLevel.ADVANCED,
      descriptionKey: 'technologies.backend.dotnet'
    },
    {
      name: 'Entity Framework Core',
      icon: 'assets/technologies/efcore.png',
      category: TechnologyCategory.BACKEND,
      proficiency: ProficiencyLevel.ADVANCED,
      descriptionKey: 'technologies.backend.entityframework'
    },
    {
      name: 'Cosmos DB',
      icon: 'assets/technologies/cosmosdb.png',
      category: TechnologyCategory.BACKEND,
      proficiency: ProficiencyLevel.BEGINNER,
      descriptionKey: 'technologies.backend.cosmosdb'
    },
    {
      name: 'GraphQL (HotChocolate)',
      icon: 'assets/technologies/graphql.png',
      category: TechnologyCategory.BACKEND,
      proficiency: ProficiencyLevel.INTERMEDIATE,
      descriptionKey: 'technologies.backend.graphql'
    },
    {
      name: 'MartenDB',
      icon: 'assets/technologies/martendb.png',
      category: TechnologyCategory.BACKEND,
      proficiency: ProficiencyLevel.INTERMEDIATE,
      descriptionKey: 'technologies.backend.martendb'
    },

    // --- Cloud Technologies (Azure Specific) ---
    {
      name: 'Azure Kubernetes Service (AKS)',
      icon: 'assets/technologies/aks.png',
      category: TechnologyCategory.CLOUD,
      proficiency: ProficiencyLevel.INTERMEDIATE,
      descriptionKey: 'technologies.cloud.aks'
    },
    {
      name: 'Azure Container Apps',
      icon: 'assets/technologies/aca.png',
      category: TechnologyCategory.CLOUD,
      proficiency: ProficiencyLevel.INTERMEDIATE,
      descriptionKey: 'technologies.cloud.containerApps'
    },
    {
      name: 'Azure Logic Apps',
      icon: 'assets/technologies/ala.png',
      category: TechnologyCategory.CLOUD,
      proficiency: ProficiencyLevel.INTERMEDIATE,
      descriptionKey: 'technologies.cloud.logicApps'
    },
    {
      name: 'Azure Functions',
      icon: 'assets/technologies/af.png',
      category: TechnologyCategory.CLOUD,
      proficiency: ProficiencyLevel.ADVANCED,
      descriptionKey: 'technologies.cloud.functions'
    },
    {
      name: 'Microsoft Entra ID',
      icon: 'assets/technologies/entraid.png',
      category: TechnologyCategory.CLOUD,
      proficiency: ProficiencyLevel.INTERMEDIATE,
      descriptionKey: 'technologies.cloud.entraId'
    },
    {
      name: 'Azure DevOps Pipelines',
      icon: 'assets/technologies/azuredevops.png',
      category: TechnologyCategory.CLOUD,
      proficiency: ProficiencyLevel.INTERMEDIATE,
      descriptionKey: 'technologies.cloud.devOpsPipelines'
    },
    {
      name: 'Application Insights',
      icon: 'assets/technologies/ai.png',
      category: TechnologyCategory.CLOUD,
      proficiency: ProficiencyLevel.ADVANCED,
      descriptionKey: 'technologies.cloud.applicationInsights'
    },

    // --- Testing Technologies ---
    {
      name: 'Jest',
      icon: 'assets/technologies/jest.png',
      category: TechnologyCategory.TESTING,
      proficiency: ProficiencyLevel.INTERMEDIATE,
      descriptionKey: 'technologies.testing.jest'
    },
    {
      name: 'Cypress',
      icon: 'assets/technologies/cypress.png',
      category: TechnologyCategory.TESTING,
      proficiency: ProficiencyLevel.INTERMEDIATE,
      descriptionKey: 'technologies.testing.cypress'
    },
    {
      name: 'Karma',
      icon: 'assets/technologies/karma.png',
      category: TechnologyCategory.TESTING,
      proficiency: ProficiencyLevel.INTERMEDIATE,
      descriptionKey: 'technologies.testing.karma'
    },
    {
      name: 'NUnit',
      icon: 'assets/technologies/nunit.png',
      category: TechnologyCategory.TESTING,
      proficiency: ProficiencyLevel.ADVANCED,
      descriptionKey: 'technologies.testing.nunit'
    }
  ];


  getAllTechnologies(): Technology[] {
    return [...this.technologies];
  }

  getTechnologiesByCategory(category: TechnologyCategory): Technology[] {
    return this.technologies.filter(tech => tech.category === category);
  }

  getTechnologiesByProficiency(proficiency: ProficiencyLevel): Technology[] {
    return this.technologies.filter(tech => tech.proficiency === proficiency);
  }

  getCategories(): TechnologyCategory[] {
    return Object.values(TechnologyCategory);
  }

  getTechnologiesGroupedByCategory(): { [key in TechnologyCategory]: Technology[] } {
    const grouped = {} as { [key in TechnologyCategory]: Technology[] };

    Object.values(TechnologyCategory).forEach(category => {
      grouped[category] = [];
    });

    this.technologies.forEach(tech => {
      grouped[tech.category].push(tech);
    });

    return grouped;
  }

  getTechnology(name: string): Technology | undefined {
    return this.technologies.find(tech =>
      tech.name.toLowerCase() === name.toLowerCase()
    );
  }
}
