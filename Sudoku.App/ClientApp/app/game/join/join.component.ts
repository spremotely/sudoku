import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameService } from '../../services/game.service';

@Component({
	selector: 'join',
	styleUrls: ['join.css'],
	templateUrl: 'join.html'
})
export class JoinComponent {
	userName: string;

	constructor(private gameService: GameService)
	{
	}

	onSubmit(form: NgForm)
	{
		if (form.valid)
		{
			this.gameService.joinGame(form.value.userName);
		}
	}
}