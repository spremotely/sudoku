import { Component } from '@angular/core';
import { GameService } from './../../services/game.service';
import { StorageService } from './../../services/storage.service';
import { HostListener } from '@angular/core';

@Component({
	selector: 'field',
	styleUrls: ['field.css'],
	templateUrl: 'field.html'
})
export class FieldComponent {
	sudoku: number[][];
	selected: number[];

	constructor(private gameService: GameService, private storageService: StorageService)
	{
		this.sudoku = storageService.get("FieldComponent.sudoku");
		this.selected = storageService.get("FieldComponent.selected");

		if (!this.selected)
		{
			this.selected = [0, 0];
		}

		gameService.sudoku.subscribe((value) =>
		{
			this.sudoku = value;
			storageService.add("FieldComponent.sudoku", this.sudoku);
		});

		gameService.number.subscribe((value) =>
		{
			this.sudoku[value.row][value.column] = value.value;
		});
	}

	onNumberFieldClick(i: number, j: number)
	{
		this.selected[0] = i;
		this.selected[1] = j;
		this.storageService.add("FieldComponent.selected", this.selected);
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