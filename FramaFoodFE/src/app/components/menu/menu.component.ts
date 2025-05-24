import { Component , Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  //private router = Inject(Router)

  constructor(){}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


}