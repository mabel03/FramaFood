import { Routes } from '@angular/router';
import {MenuComponent} from '../app/components/menu/menu.component'
import { MesasComponent } from './components/mesas/mesas.component';
import {SobreNosotrosComponent} from './components/sobre-nosotros/sobre-nosotros.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { LoginComponent } from './components/login/login.component';
import { PanelChefComponent } from './components/panel-chef/panel-chef.component';
import { PedidoMeseraChefComponent } from './components/pedido-mesera-chef/pedido-mesera-chef.component';

export const routes: Routes = [
    { path:'', component:MenuComponent },
    { path:'Menu', component:MenuComponent },
    { path: 'Mesas', component: MesasComponent },
    { path: 'SobreNosotros', component: SobreNosotrosComponent },
    { path: 'Contactos', component: ContactosComponent },
    { path: 'Mesas/pedidos', component: PedidosComponent  },
    { path: 'Mesas', component: MesasComponent },
    { path: 'login', component:LoginComponent },
    { path: 'chef', component:PanelChefComponent },
    { path: 'Pedidos/chef', component: PedidoMeseraChefComponent}
];
