import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [TranslatePipe],
  templateUrl: './home-page.html',
})
export class HomePage {
  stack = ['Angular', 'TypeScript', '.NET', 'GraphQL', 'Azure', 'Kubernetes'];
  go(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
}
