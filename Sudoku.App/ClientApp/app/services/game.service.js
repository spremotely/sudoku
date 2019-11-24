var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HubConnectionBuilder } from '@aspnet/signalr';
var GameService = /** @class */ (function () {
    function GameService() {
        this.connection = undefined;
        this.joinStatus = new Subject();
        this.users = new Subject();
        this.sudoku = new Subject();
        this.number = new Subject();
        this.init();
    }
    GameService.prototype.init = function () {
        var _this = this;
        if (this.connection) {
            return;
        }
        this.connection = new HubConnectionBuilder().withUrl("http://localhost:51255/sudokuHub").build();
        this.connection.start().catch(function (err) { return console.error(err.toString()); });
        this.connection.on("JoinGame", function (joinStatus) {
            _this.joinStatus.next(joinStatus);
        });
        this.connection.on("ListGamers", function (gamers) {
            _this.users.next(gamers);
        });
        this.connection.on("GetSudoku", function (sudoku) {
            _this.sudoku.next(sudoku);
        });
        this.connection.on("AddNumber", function (number) {
            _this.number.next(number);
        });
    };
    GameService.prototype.joinGame = function (username) {
        this.connection.invoke("JoinGame", username);
    };
    GameService.prototype.addNumber = function (row, column, value) {
        this.connection.invoke("AddNumber", row, column, value);
    };
    GameService = __decorate([
        Injectable({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [])
    ], GameService);
    return GameService;
}());
export { GameService };
//# sourceMappingURL=game.service.js.map