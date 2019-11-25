import { Component, Input } from '@angular/core';
import { GameService } from './../../services/game.service';
import { User } from "./../../models/models";

@Component({
	selector: 'users',
	styleUrls: ['users.css'],
	templateUrl: 'users.html'
})
export class UsersComponent {
	@Input()
	user: User;

	@Input()
	gamers: string[];

	constructor(private gameService: GameService)
	{
	}
}