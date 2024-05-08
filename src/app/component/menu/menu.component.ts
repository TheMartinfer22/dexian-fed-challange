import { Component } from '@angular/core';
import {StyleClassModule} from "primeng/styleclass";
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    StyleClassModule,
    NgClass
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(public router: Router) {
  }

}
