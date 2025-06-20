import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notificacion {
  message: string;
  type: 'success'| 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private notificationSubject = new Subject<Notificacion>
  notification$ = this.notificationSubject.asObservable();

  constructor() { }

  showSucces(message: string){
    const emoji = `✅${message}`
    this.notificationSubject.next({message:emoji, type: 'success'});
  }

  showError(message: string) {
    const emoji = `❌${message}`
    this.notificationSubject.next({message:emoji, type: 'error'});
  }
}
