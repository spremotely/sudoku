import { Component, Input } from '@angular/core';
import { GameService } from './../../services/game.service';
import { HostListener } from '@angular/core';

@Component({
	selector: 'field',
	styleUrls: ['field.css'],
	templateUrl: 'field.html'
})
export class FieldComponent {

	selected: number[] = [0, 0];

	@Input()
	sudoku: number[][];

	constructor(private gameService: GameService)
	{
	}

	onNumberFieldClick(i: number, j: number)
	{
		this.selected[0] = i;
		this.selected[1] = j;
	}

	@HostListener('window:keydown', ['$event'])
	onKeyDown(event: KeyboardEvent)
	{
		const number = Number(event.key);
		if (isNaN(number))
		{
			return;
		}

		if (number === 0)
		{
			return;
		}

		if (this.sudoku[this.selected[0]][this.selected[1]] !== 0)
		{
			return;
		}

		this.gameService.addNumber(this.selected[0], this.selected[1], number);
	}
}