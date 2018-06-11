import { Component, OnInit } from '@angular/core';
import {
	trigger,
	style,
	transition,
	animate,
	keyframes,
	query,
	stagger
} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	animations: [
		trigger('tasks', [
			transition('* => *', [
				query(':enter', style({ opacity: 0 }), { optional: true }),

				query(':enter', stagger('300ms', [
					animate('.6s ease-in', keyframes([
						style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
						style({ opacity: .5, transform: 'translateY(35%)', offset: .3 }),
						style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
					]))]), { optional: true }),

					query(':leave', stagger('300ms', [
						animate('.6s ease-in', keyframes([
							style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
							style({ opacity: .5, transform: 'translateY(35%)', offset: .3 }),
							style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 }),
						]))]), { optional: true })

			])
		])
	]
})
export class TaskComponent implements OnInit {

	itemCount: number;
	btnText: string = 'Add a task';
	taskText: string = 'My first task...';
	tasks = [];
	errorMessage: string;

  constructor(private _data: DataService) {	}

	ngOnInit() {
		this._data.getTasks().subscribe(data => {
			this.tasks = data;
			this.itemCount = this.tasks.length;
		});
	}

	saveTask() {
		this.tasks.push(this.taskText);
		this.itemCount = this.tasks.length;
		this._data.saveTask(this.taskText)
			.subscribe( data => {
				this.ngOnInit();
			}, err => this.errorMessage = err
		);
		this.taskText = '';
	}

	removeTask(_id) {
		this.tasks.splice(_id, 1);
		this._data.removeTask(_id)
			.subscribe( data => {
					this.ngOnInit();
				}, err => this.errorMessage = err
		)
	}

}
