var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { GameService } from "./services/game.service";
var AppComponent = /** @class */ (function () {
    function AppComponent(gameService) {
        this.gameService = gameService;
        this.currentView = "game";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameService.user.subscribe(function (value) {
            _this.user = value;
        });
        this.gameService.gamers.subscribe(function (value) {
            _this.gamers = value;
        });
        this.gameService.status.subscribe(function (value) {
            _this.status = value;
        });
        this.gameService.sudoku.subscribe(function (value) {
            _this.sudoku = value;
        });
        this.gameService.number.subscribe(function (value) {
            _this.sudoku[value.row][value.column] = value.value;
        });
        this.gameService.winner.subscribe(function (value) {
            _this.winner = value;
        });
        this.gameService.top.subscribe(function (value) {
            _this.top = value;
        });
    };
    AppComponent.prototype.setView = function (view) {
        this.currentView = view;
    };
    AppComponent = __decorate([
        Component({
            selector: "app",
            styleUrls: ["app.css"],
            templateUrl: "app.html"
        }),
        __metadata("design:paramtypes", [GameService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map