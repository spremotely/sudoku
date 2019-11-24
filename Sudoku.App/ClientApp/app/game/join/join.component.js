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
import { GameService } from '../../services/game.service';
import { StorageService } from './../../services/storage.service';
var JoinComponent = /** @class */ (function () {
    function JoinComponent(gameService, storageService) {
        var _this = this;
        this.gameService = gameService;
        this.storageService = storageService;
        gameService.joinStatus.subscribe(function (value) {
            if (!value.isSuccess) {
                _this.errorMessage = value.errorMessage;
                return;
            }
            _this.errorMessage = undefined;
        });
    }
    JoinComponent.prototype.onSubmit = function (form) {
        if (form.valid) {
            this.storageService.add("username", form.value.username);
            this.gameService.joinGame(form.value.username);
        }
    };
    JoinComponent = __decorate([
        Component({
            selector: 'join',
            styleUrls: ['join.css'],
            templateUrl: 'join.html'
        }),
        __metadata("design:paramtypes", [GameService, StorageService])
    ], JoinComponent);
    return JoinComponent;
}());
export { JoinComponent };
//# sourceMappingURL=join.component.js.map