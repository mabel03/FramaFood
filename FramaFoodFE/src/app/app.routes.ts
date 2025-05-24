import { Routes } from '@angular/router';
import {MenuComponent} from '../app/components/menu/menu.component'
import { MesasComponent } from './components/mesas/mesas.component';

export const routes: Routes = [
    { path:'', component:MenuComponent },
    { path: 'Mesas', component: MesasComponent }
];
