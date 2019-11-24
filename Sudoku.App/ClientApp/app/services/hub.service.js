var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';
var HubService = /** @class */ (function () {
    function HubService() {
    }
    HubService.connectToHub = function () {
        var _this = this;
        if (this.hubConnection) {
            return;
        }
        this.hubConnection = new HubConnectionBuilder().withUrl("http://localhost:51255/sudokuHub").build();
        this.hubConnection.start()
            .then(function () {
            console.log('Connection started!');
            _this.hubConnection.on("JoinGame", function (isSuccess, message) {
                _this.joinGameCallbacks.forEach(function (value) {
                    value(isSuccess, message);
                });
            });
            _this.hubConnection.on("ListGamers", function (gamers) {
                _this.listGamersCallbacks.forEach(function (value) {
                    value(gamers);
                });
            });
            _this.hubConnection.on("GetSudoku", function (sudoku) {
                _this.getSudokuCallbacks.forEach(function (value) {
                    value(sudoku);
                });
            });
        })
            .catch(function (err) {
            console.log('Error while establishing connection');
            _this.reconnectToHub();
        });
    };
    HubService.reconnectToHub = function () {
        var _this = this;
        setTimeout(function () {
            _this.connectToHub();
        }, 3000);
    };
    HubService.startConnection = function () {
        this.connectToHub();
    };
    HubService.getConnection = function () {
        this.connectToHub();
        return this.hubConnection;
    };
    HubService.joinGame = function (name) {
        this.hubConnection.invoke("JoinGame", name);
    };
    HubService.onJoinGame = function (callback) {
        this.joinGameCallbacks.push(callback);
    };
    HubService.onListGamers = function (callback) {
        this.listGamersCallbacks.push(callback);
    };
    HubService.onGetSudoku = function (callback) {
        this.getSudokuCallbacks.push(callback);
    };
    HubService.joinGameCallbacks = [];
    HubService.listGamersCallbacks = [];
    HubService.getSudokuCallbacks = [];
    HubService = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], HubService);
    return HubService;
}());
export { HubService };
//# sourceMappingURL=hub.service.js.map