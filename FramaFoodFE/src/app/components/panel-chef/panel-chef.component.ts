import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-chef',
  standalone: true,
  imports: [NgFor],
  templateUrl: './panel-chef.component.html',
  styleUrl: './panel-chef.component.css'
})
export class PanelChefComponent {
  public numeros: number = 5;
  items = [
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
    { name: 'Pedido' },
  ];

  tasks = [
    { name: 'Tarea 1', completed: false },
    { name: 'Tarea 2', completed: false },
    { name: 'Tarea 3', completed: false },
    { name: 'Tarea 4', completed: false },
    { name: 'Tarea 1', completed: false },
    { name: 'Tarea 2', completed: false },
    { name: 'Tarea 3', completed: false },
    { name: 'Tarea 4', completed: false },
  ];

  toggle(task: any) {
    task.completed = !task.completed;
  }

}
