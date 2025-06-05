import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'] 
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) {} 

  ngOnInit(): void {
    
  }

  irASobreNosotros() {
   this.router.navigate(['/SobreNosotros']);
  }

  irMenu() {
   this.router.navigate(['/Menu']);
  }
  
  irContactos() {
   this.router.navigate(['/Contactos']);
  }
}
