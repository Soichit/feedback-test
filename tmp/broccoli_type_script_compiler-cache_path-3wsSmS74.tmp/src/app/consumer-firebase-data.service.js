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
// dependency for the Signal class which holds structure for signals in our firebase db
//import { Signal } from './consumer/signal-view/signal';
var angularfire2_1 = require('angularfire2');
var ConsumerFirebaseDataService = (function () {
    function ConsumerFirebaseDataService(af) {
        this.af = af;
        this.reviews = af.database.list('/reviews');
    }
    ConsumerFirebaseDataService.prototype.getReviews = function () {
        return this.reviews;
    };
    ConsumerFirebaseDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], ConsumerFirebaseDataService);
    return ConsumerFirebaseDataService;
}());
exports.ConsumerFirebaseDataService = ConsumerFirebaseDataService;
//# sourceMappingURL=consumer-firebase-data.service.js.map