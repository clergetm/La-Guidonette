import { Route } from '@angular/router';
import { SearchComponent } from './search.component';

export const SEARCH_ROUTE: Route = {
  path: 'search',
  component: SearchComponent,
  data: {
    pageTitle: 'search.title',
  },
};
