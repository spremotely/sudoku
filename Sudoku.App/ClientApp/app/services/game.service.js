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
        this.user = new Subject();
        this.gamers = new Subject();
        this.sudoku = new Subject();
        this.number = new Subject();
        this.status = new Subject();
        this.winner = new Subject();
        this.top = new Subject();
        this.init();
    }
    GameService.prototype.init = function () {
        var _this = this;
        if (this.connection) {
            return;
        }
        this.connection = new HubConnectionBuilder().withUrl("http://localhost:51255/sudokuHub").build();
        this.connection.start().catch(function (err) { return console.error(err.toString()); });
        this.connection.on("JoinGame", function (user) {
            _this.user.next(user);
            _this.listGamers();
            _this.getSudoku();
            _this.gameStatus();
        });
        this.connection.on("ListGamers", function (gamers) {
            _this.gamers.next(gamers);
        });
        this.connection.on("GetSudoku", function (sudoku) {
            _this.sudoku.next(sudoku);
        });
        this.connection.on("AddNumber", function (number) {
            _this.number.next(number);
            _this.gameStatus();
        });
        this.connection.on("GameStatus", function (status) {
            _this.status.next(status);
            if (status === "Solved") {
                _this.getWinner();
            }
        });
        this.connection.on("GetWinner", function (winner) {
            _this.winner.next(winner);
        });
        this.connection.on("GetTop", function (top) {
            _this.top.next(top);
        });
        this.connection.on("UpdateTop", function (top) {
            _this.top.next(top);
        });
    };
    GameService.prototype.joinGame = function (userName) {
        this.connection.invoke("JoinGame", userName);
    };
    GameService.prototype.addNumber = function (row, column, value) {
        this.connection.invoke("AddNumber", row, column, value);
    };
    GameService.prototype.newGame = function () {
        this.connection.invoke("NewGame");
    };
    GameService.prototype.listGamers = function () {
        this.connection.invoke("ListGamers");
    };
    GameService.prototype.getSudoku = function () {
        this.connection.invoke("GetSudoku");
    };
    GameService.prototype.gameStatus = function () {
        this.connection.invoke("GameStatus");
    };
    GameService.prototype.getWinner = function () {
        this.connection.invoke("GetWinner");
    };
    GameService.prototype.getTop = function () {
        this.connection.invoke("GetTop");
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