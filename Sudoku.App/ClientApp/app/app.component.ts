﻿import { Component } from '@angular/core';

@Component({
	selector: 'app',
	styleUrls: ['app.css'],
	templateUrl: 'app.html'
})
export class AppComponent {
	currentView = 'game';

	setView(view: string)
	{
		this.currentView = view;
	}
}