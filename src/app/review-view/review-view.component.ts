import { Component, OnInit } from '@angular/core';
import { MdInput } from '@angular2-material/input';
import { MdButton } from '@angular2-material/button';
import { MdCard, MdCardHeader, MdCardTitleGroup, MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdRadioButton, MdRadioGroup, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { ConsumerFirebaseDataService } from '../../consumer-firebase-data.service';

@Component({
  moduleId: module.id,
  selector: 'app-review-view',
  templateUrl: 'review-view.component.html',
  styleUrls: ['review-view.component.css'],
  directives: [ 
    MdInput,
    MdButton,
    MdCard, MdCardHeader, MdCardTitleGroup, MD_CARD_DIRECTIVES,
    MdRadioButton, MdRadioGroup
  ],
  providers: [ MdUniqueSelectionDispatcher ]
})
export class ReviewViewComponent implements OnInit {
  reviews: FirebaseListObservable<any>;
  options = [];
  myReview = {score: 3, comment: '', author: '', name: ''};
  constructor(private fbds: ConsumerFirebaseDataService, private af: AngularFire) {
    this.options.push({score: 1, enabled: false})
    this.options.push({score: 2, enabled: false})
    this.options.push({score: 3, enabled: true})
    this.options.push({score: 4, enabled: false})
    this.options.push({score: 5, enabled: false})
  }

  ngOnInit() {
    this.reviews = this.fbds.getReviews();
  }
  submitReview() {
    this.af.auth.subscribe(snap => {
      this.myReview.author = snap.uid;
    })
    this.reviews.push(this.myReview);
    this.myReview.score = 3;
    this.myReview.comment = '';
    this.myReview.name = '';
  }
}
