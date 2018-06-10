import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	goals: any;

  constructor( private _data: DataService) { }

  ngOnInit() {
		this._data.goal.subscribe(res => this.goals = res);
  }

}
