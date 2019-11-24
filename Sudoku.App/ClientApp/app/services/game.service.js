var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { HubService } from './../services/hub.service';
var GameService = /** @class */ (function () {
    function GameService() {
    }
    GameService.init = function () {
        var _this = this;
        if (this.isInitialized) {
            return;
        }
        HubService.startConnection();
        HubService.onJoinGame(function (isSuccess, message) {
            _this.isJoined = isSuccess;
            _this.message = message;
        });
        HubService.onListGamers(function (gamers) {
            _this.gamers = gamers;
        });
        HubService.onGetSudoku(function (sudoku) {
            _this.sudoku = sudoku;
        });
    };
    GameService.join = function (username) {
        HubService.joinGame(username);
    };
    GameService.onJoinGame = function (callback) {
        HubService.onJoinGame(callback);
    };
    GameService.onListGamers = function (callback) {
        HubService.onListGamers(callback);
    };
    GameService.onGetSudoku = function (callback) {
        HubService.onGetSudoku(callback);
    };
    GameService.isInitialized = false;
    GameService.isJoined = false;
    GameService.gamers = [];
    GameService.sudoku = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    GameService.selected = [0, 0];
    GameService = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], GameService);
    return GameService;
}());
export { GameService };
//# sourceMappingURL=game.service.js.map