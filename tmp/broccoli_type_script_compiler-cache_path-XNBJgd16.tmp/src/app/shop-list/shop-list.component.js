"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var ShopListComponent = (function () {
    function ShopListComponent(af) {
        this.items = af.database.list('/messages');
    }
    ShopListComponent.prototype.add = function (newName) {
        this.items.push({ text: newName });
    };
    ShopListComponent.prototype.update = function (key, newName) {
        this.items.update(key, { text: newName });
    };
    ShopListComponent.prototype.deleteItem = function (key) {
        this.items.remove(key);
    };
    ShopListComponent.prototype.deleteEverything = function () {
        this.items.remove();
    };
    ShopListComponent.prototype.ngOnInit = function () {
    };
    ShopListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-shop-list',
            templateUrl: 'shop-list.component.html',
            styleUrls: ['shop-list.component.css']
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], ShopListComponent);
    return ShopListComponent;
}());
exports.ShopListComponent = ShopListComponent;
//# sourceMappingURL=shop-list.component.js.map