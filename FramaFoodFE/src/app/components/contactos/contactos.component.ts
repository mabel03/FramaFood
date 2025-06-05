import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactos',
  imports: [],
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.css'
})
export class ContactosComponent {
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
