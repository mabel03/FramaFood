import { Component , Inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  private router = Inject(Router)

  constructor(){}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


}