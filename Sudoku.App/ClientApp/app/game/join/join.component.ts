import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'join',
	styleUrls: ['join.css'],
	templateUrl: 'join.html'
})
export class JoinComponent {
	username = "";

	constructor()
	{
		GameService.init();
	}

	onSubmit(form: NgForm)
	{
		if (form.valid)
		{
			GameService.join(form.value.username);
		}
	}
}