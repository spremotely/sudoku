import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { StorageService } from './../../services/storage.service';

@Component({
	selector: 'join',
	styleUrls: ['join.css'],
	templateUrl: 'join.html'
})
export class JoinComponent {
	username: string;
	errorMessage: string;

	constructor(private gameService: GameService, private storageService: StorageService)
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
			this.storageService.add("username", form.value.username);
			this.gameService.joinGame(form.value.username);
		}
	}
}