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
var input_1 = require('@angular2-material/input');
var button_1 = require('@angular2-material/button');
var card_1 = require('@angular2-material/card');
var radio_1 = require('@angular2-material/radio');
var angularfire2_1 = require('angularfire2');
var consumer_firebase_data_service_1 = require("../consumer-firebase-data.service");
var ReviewViewComponent = (function () {
    function ReviewViewComponent(fbds, af) {
        this.fbds = fbds;
        this.af = af;
        this.options = [];
        this.myReview = { score: 3, comment: '', author: '', name: '' };
        this.options.push({ score: 1, enabled: false });
        this.options.push({ score: 2, enabled: false });
        this.options.push({ score: 3, enabled: true });
        this.options.push({ score: 4, enabled: false });
        this.options.push({ score: 5, enabled: false });
    }
    ReviewViewComponent.prototype.ngOnInit = function () {
        this.reviews = this.fbds.getReviews();
    };
    ReviewViewComponent.prototype.submitReview = function () {
        var _this = this;
        this.af.auth.subscribe(function (snap) {
            _this.myReview.author = snap.uid;
        });
        this.reviews.push(this.myReview);
        this.myReview.score = 3;
        this.myReview.comment = '';
        this.myReview.name = '';
    };
    ReviewViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-review-view',
            templateUrl: 'review-view.component.html',
            styleUrls: ['review-view.component.css'],
            directives: [
                input_1.MdInput,
                button_1.MdButton,
                card_1.MdCard, card_1.MdCardHeader, card_1.MdCardTitleGroup, card_1.MD_CARD_DIRECTIVES,
                radio_1.MdRadioButton, radio_1.MdRadioGroup
            ],
            providers: [radio_1.MdUniqueSelectionDispatcher]
        }), 
        __metadata('design:paramtypes', [consumer_firebase_data_service_1.ConsumerFirebaseDataService, angularfire2_1.AngularFire])
    ], ReviewViewComponent);
    return ReviewViewComponent;
}());
exports.ReviewViewComponent = ReviewViewComponent;
//# sourceMappingURL=review-view.component.js.map