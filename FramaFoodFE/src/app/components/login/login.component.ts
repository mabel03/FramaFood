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
  Usuario: string;
  Pass: string;
  public router = inject(Router);

  constructor(private fb: FormBuilder, private _LoginService: LoginService) {
    this.loginForm = this.fb.group({
      Usuario: ['', [Validators.required]],
      Pass: ['', Validators.required],
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
        .Login(this.loginForm.value.Usuario, this.loginForm.value.Pass)
        .subscribe((a) => {
          console.log(a)
          if (a) {
            if (a.rol === 'CHEF') {
              this.router.navigate(['/chef']);
              this._LoginService.setUserName(a.nombreUsuario)
              this._LoginService.setUser(a.usuario)
              localStorage.setItem("userName", a.nombreUsuario)
              localStorage.setItem('User', a.usuario)
            } if(a.rol === 'MESERA') {
              this.router.navigate(['/Mesas']);
              this._LoginService.setUserName(a.nombreUsuario)
              this._LoginService.setRolName(a.rol)
              this._LoginService.setUser(a.usuario)
              localStorage.setItem('User', a.usuario)
            }
          }
        });
    }
  }
}
