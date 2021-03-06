import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {ShopListComponent} from "./shop-list/shop-list.component";
import {ReviewViewComponent} from "./review-view/review-view.component"; 

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ShopListComponent, ReviewViewComponent]
})
export class AppComponent {
  title = 'app works!';
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list('items');
  }
}
