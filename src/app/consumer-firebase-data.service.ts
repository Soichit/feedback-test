import { Injectable } from '@angular/core';
// dependency for the Signal class which holds structure for signals in our firebase db
//import { Signal } from './consumer/signal-view/signal';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConsumerFirebaseDataService {
  reviews: FirebaseListObservable<string[]>;

  constructor(public af: AngularFire) {
    this.reviews = af.database.list('/reviews');
  }
  
  getReviews() {
    return this.reviews;
  }
  
}
