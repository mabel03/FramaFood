import { Routes } from '@angular/router';
import {MenuComponent} from '../app/components/menu/menu.component'
import { MesasComponent } from './components/mesas/mesas.component';
import { LoginComponent } from './components/login/login.component';
import { PanelChefComponent } from './components/panel-chef/panel-chef.component';

export const routes: Routes = [
    { path:'', component:MenuComponent },
    { path: 'Mesas', component: MesasComponent },
    { path: 'login', component:LoginComponent },
    { path: 'chef', component:PanelChefComponent },
];
