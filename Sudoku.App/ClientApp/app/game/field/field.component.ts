import { Component } from '@angular/core';
import { GameService } from './../../services/game.service';

@Component({
	selector: 'field',
	styleUrls: ['field.css'],
	templateUrl: 'field.html'
})
export class FieldComponent {
	sudoku: number[][];
	selected = [0, 0];

	constructor()
	{
		GameService.init();
		this.sudoku = GameService.sudoku;
		this.selected = GameService.selected;
	}

	ngOnInit()
	{
		GameService.onGetSudoku((sudoku: number[][]) =>
		{
			this.sudoku = sudoku;
		});
	}

	onNumberFieldClick(i: number, j: number)
	{
		this.selected[0] = i;
		this.selected[1] = j;
		GameService.selected = this.selected;
	}
}