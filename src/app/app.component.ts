import { Component, OnInit } from '@angular/core';
import { routeAnimations } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
