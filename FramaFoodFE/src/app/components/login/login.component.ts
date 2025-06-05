import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  Nombre: string = 'Elchef';
  Contrasena: string = '1234';
  public router = inject(Router);

  constructor(private fb: FormBuilder, private _LoginService: LoginService) {
    this.loginForm = this.fb.group({
      Nombre: ['', [Validators.required]],
      Contrasena: ['', Validators.required],
    });

    /*this._LoginService.obtenerUsuarios().subscribe(a => {
      console.log(a);
    });*/

    const usurio = this._LoginService.currentUser$;
    console.log(usurio);
  }

  onLogin() {
    if (this.loginForm.valid) {
      this._LoginService
        .Login(this.loginForm.value.Nombre, this.loginForm.value.Contrasena)
        .subscribe((a) => {
          if (a) {
            if (a.rol === 'CHEF') {
              this.router.navigate(['/chef']);
            } if(a.rol === 'MESERA') {
              this.router.navigate(['/Mesas']);
            }
          }
        });
    }
  }
}
