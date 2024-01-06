import { RouterModule, Routes } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';

export const routes: Routes = [
  { path: '', component: PreviewComponent },

];

export const AppRoutingModule = RouterModule.forRoot(routes);
