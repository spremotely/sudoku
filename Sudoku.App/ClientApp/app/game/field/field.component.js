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
var FieldComponent = /** @class */ (function () {
    function FieldComponent() {
        this.selected = [0, 0];
        GameService.init();
        this.sudoku = GameService.sudoku;
        this.selected = GameService.selected;
    }
    FieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        GameService.onGetSudoku(function (sudoku) {
            _this.sudoku = sudoku;
        });
    };
    FieldComponent.prototype.onNumberFieldClick = function (i, j) {
        this.selected[0] = i;
        this.selected[1] = j;
        GameService.selected = this.selected;
    };
    FieldComponent = __decorate([
        Component({
            selector: 'field',
            styleUrls: ['field.css'],
            templateUrl: 'field.html'
        }),
        __metadata("design:paramtypes", [])
    ], FieldComponent);
    return FieldComponent;
}());
export { FieldComponent };
//# sourceMappingURL=field.component.js.map