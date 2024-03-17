import { Routes } from '@angular/router';
import { TrelloComponent } from './Component/trello/trello.component';

export const routes: Routes = [
  {path : '', redirectTo:'trello', pathMatch:'full' },
  {path : 'trello', component:TrelloComponent}

];
