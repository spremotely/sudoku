var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { GameService } from './../../services/game.service';
import { StorageService } from './../../services/storage.service';
import { HostListener } from '@angular/core';
var FieldComponent = /** @class */ (function () {
    function FieldComponent(gameService, storageService) {
        var _this = this;
        this.gameService = gameService;
        this.storageService = storageService;
        this.sudoku = storageService.get("FieldComponent.sudoku");
        this.selected = storageService.get("FieldComponent.selected");
        if (!this.selected) {
            this.selected = [0, 0];
        }
        gameService.sudoku.subscribe(function (value) {
            _this.sudoku = value;
            storageService.add("FieldComponent.sudoku", _this.sudoku);
        });
        gameService.number.subscribe(function (value) {
            _this.sudoku[value.row][value.column] = value.value;
        });
    }
    FieldComponent.prototype.onNumberFieldClick = function (i, j) {
        this.selected[0] = i;
        this.selected[1] = j;
        this.storageService.add("FieldComponent.selected", this.selected);
    };
    FieldComponent.prototype.onKeyDown = function (event) {
        var number = Number(event.key);
        if (isNaN(number)) {
            return;
        }
        if (number === 0) {
            return;
        }
        if (this.sudoku[this.selected[0]][this.selected[1]] !== 0) {
            return;
        }
        this.gameService.addNumber(this.selected[0], this.selected[1], number);
    };
    __decorate([
        HostListener('window:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], FieldComponent.prototype, "onKeyDown", null);
    FieldComponent = __decorate([
        Component({
            selector: 'field',
            styleUrls: ['field.css'],
            templateUrl: 'field.html'
        }),
        __metadata("design:paramtypes", [GameService, StorageService])
    ], FieldComponent);
    return FieldComponent;
}());
export { FieldComponent };
//# sourceMappingURL=field.component.js.map