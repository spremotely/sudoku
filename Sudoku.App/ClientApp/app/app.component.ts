import { Component } from "@angular/core";
import { GameService } from "./services/game.service";
import { User } from "./models/models";

@Component({
	selector: "app",
	styleUrls: ["app.css"],
	templateUrl: "app.html"
})
export class AppComponent {
	currentView: string;
	user: User;
	gamers: string[];
	status: string;
	sudoku: number[][];
	winner: User;
	top: User[];

	constructor(private gameService: GameService)
	{
		this.currentView = "game";
	}

	ngOnInit()
	{
		this.gameService.user.subscribe((value) =>
		{
			this.user = value;
		});

		this.gameService.gamers.subscribe((value) =>
		{
			this.gamers = value;
		});

		this.gameService.status.subscribe((value) =>
		{
			this.status = value;
		});

		this.gameService.sudoku.subscribe((value) =>
		{
			this.sudoku = value;
		});

		this.gameService.number.subscribe((value) =>
		{
			this.sudoku[value.row][value.column] = value.value;
		});

		this.gameService.winner.subscribe((value) =>
		{
			this.winner = value;
		});

		this.gameService.top.subscribe((value) =>
		{
			this.top = value;
		});
	}

	setView(view: string)
	{
		this.currentView = view;
	}
}