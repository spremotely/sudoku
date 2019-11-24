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

	ngOnInit()
	{
	}

	onNumberFieldClick(i: number, j: number)
	{
		this.selected[0] = i;
		this.selected[1] = j;
	}
}