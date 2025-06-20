import { Component } from '@angular/core';
import { Notificacion, NotificacionesService } from '../../services/notificaciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificacion',
  imports: [CommonModule],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent {
  notification: Notificacion; 
  time: any;

  constructor(private _notificacionService: NotificacionesService){}

  ngOnInit(){
    this._notificacionService.notification$.subscribe((n) => {
      this.notification = n;
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.notification = null
      }, 3000);
    });
  }

}
