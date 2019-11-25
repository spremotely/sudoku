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
var EndComponent = /** @class */ (function () {
    function EndComponent(gameService) {
        this.gameService = gameService;
    }
    EndComponent.prototype.onNewGame = function () {
        this.gameService.newGame();
        this.gameService.getSudoku();
        this.gameService.gameStatus();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], EndComponent.prototype, "status", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], EndComponent.prototype, "winner", void 0);
    EndComponent = __decorate([
        Component({
            selector: 'end',
            styleUrls: ['end.css'],
            templateUrl: 'end.html'
        }),
        __metadata("design:paramtypes", [GameService])
    ], EndComponent);
    return EndComponent;
}());
export { EndComponent };
//# sourceMappingURL=end.component.js.map