import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameService } from '../../services/game.service';

@Component({
	selector: 'join',
	styleUrls: ['join.css'],
	templateUrl: 'join.html'
})
export class JoinComponent {
	username: string = undefined;
	errorMessage: string = undefined;

	constructor(private gameService: GameService)
	{
		gameService.joinStatus.subscribe((value) =>
		{
			if (!value.isSuccess)
			{
				this.errorMessage = value.errorMessage;
				return;
			}

			this.errorMessage = undefined;
		});
	}

	onSubmit(form: NgForm)
	{
		if (form.valid)
		{
			this.gameService.joinGame(form.value.username);
		}
	}
}