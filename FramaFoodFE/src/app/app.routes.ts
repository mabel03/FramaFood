import { Routes } from '@angular/router';
import {MenuComponent} from '../app/components/menu/menu.component'
import { MesasComponent } from './components/mesas/mesas.component';
import {SobreNosotrosComponent} from './components/sobre-nosotros/sobre-nosotros.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { LoginComponent } from './components/login/login.component';
import { PanelChefComponent } from './components/panel-chef/panel-chef.component';
import { PedidoMeseraChefComponent } from './components/pedido-mesera-chef/pedido-mesera-chef.component';
import { HomeComponent } from './components/home/home.component';
//import { hasRoleGuard } from './guards/has-role.guard';

export const routes: Routes = [
    { path:'', component:HomeComponent },
    { path: 'home', component:HomeComponent },
    { path: 'Menu', component:MenuComponent },
    { path: 'Mesas', component: MesasComponent },
    { path: 'SobreNosotros', component: SobreNosotrosComponent },
    { path: 'Contactos', component: ContactosComponent },
    { path: 'Mesas/pedidos', component: PedidosComponent  },
    { path: 'login', component:LoginComponent },
    { path: 'chef', component:PanelChefComponent },
    { path: 'Pedidos/chef', component: PedidoMeseraChefComponent}
];
