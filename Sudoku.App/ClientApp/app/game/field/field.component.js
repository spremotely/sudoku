var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { GameService } from './../../services/game.service';
import { HostListener } from '@angular/core';
var FieldComponent = /** @class */ (function () {
    function FieldComponent(gameService) {
        this.gameService = gameService;
        this.selected = [0, 0];
    }
    FieldComponent.prototype.onNumberFieldClick = function (i, j) {
        this.selected[0] = i;
        this.selected[1] = j;
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
        Input(),
        __metadata("design:type", Array)
    ], FieldComponent.prototype, "sudoku", void 0);
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
        __metadata("design:paramtypes", [GameService])
    ], FieldComponent);
    return FieldComponent;
}());
export { FieldComponent };
//# sourceMappingURL=field.component.js.map