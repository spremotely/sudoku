import { Component } from '@angular/core';

@Component({
	selector: 'game',
	styleUrls: ['game.css'],
	templateUrl: 'game.html'
})
export class GameComponent {
	sudoku = [
		[0, 1, 2, 3, 4, 5, 6, 7, 8],
		[0, 1, 2, 3, 4, 5, 6, 7, 8],
		[0, 1, 2, 3, 4, 5, 6, 7, 8],
		[0, 1, 2, 3, 4, 5, 6, 7, 8],
		[0, 1, 2, 3, 4, 5, 6, 7, 8],
		[0, 1, 2, 3, 4, 5, 6, 7, 8],
		[0, 1, 2, 3, 4, 5, 6, 7, 8],
		[0, 1, 2, 3, 4, 5, 6, 7, 8],
		[0, 1, 2, 3, 4, 5, 6, 7, 8]
	];

	selected = [0, 0];

	username = "";

	isInGame = false;
	isNewGame = true;

	onFieldClick(i: number, j: number) {
		this.selected[0] = i;
		this.selected[1] = j;
	};
}