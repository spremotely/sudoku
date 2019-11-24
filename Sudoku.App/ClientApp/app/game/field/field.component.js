var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var FieldComponent = /** @class */ (function () {
    function FieldComponent() {
        this.selected = [0, 0];
    }
    FieldComponent.prototype.ngOnInit = function () {
    };
    FieldComponent.prototype.onNumberFieldClick = function (i, j) {
        this.selected[0] = i;
        this.selected[1] = j;
    };
    FieldComponent = __decorate([
        Component({
            selector: 'field',
            styleUrls: ['field.css'],
            templateUrl: 'field.html'
        })
    ], FieldComponent);
    return FieldComponent;
}());
export { FieldComponent };
//# sourceMappingURL=field.component.js.map