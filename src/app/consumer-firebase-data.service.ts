import { Injectable } from '@angular/core';
// dependency for the Signal class which holds structure for signals in our firebase db
//import { Signal } from './consumer/signal-view/signal';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConsumerFirebaseDataService {
  signalFeed: FirebaseListObservable<string[]>;
  reviews: FirebaseListObservable<string[]>;
  tableList: any[];
  restaurant_id: string;
  restaurant_name: string;
  table: number; 
  user: string;
  menuItems: FirebaseListObservable<any[]>;
  menus: FirebaseListObservable<any[]>;
  menuStructure: Observable<any>;

  constructor(public af: AngularFire) {
    this.restaurant_id = '-KMNBxENcTCY_MjVzLef';
    this.restaurant_name = "Cedar's";
    this.signalFeed = af.database.list('restaurants/' + this.restaurant_id + '/feed')
    this.reviews = af.database.list('restaurants/'+ this.restaurant_id +'/reviews')
    this.table = 0;
    let tempTables = af.database.list('restaurants/' + this.restaurant_id + '/tables')
    tempTables.subscribe((items) => {
      this.tableList = items;
    });
    this.menuItems = af.database.list('restaurants/' + this.restaurant_id + '/menu_items');
    this.menus = af.database.list('restaurants/' + this.restaurant_id + '/menu_structure/menus');
    this.menuStructure = af.database.object('restaurants/' + this.restaurant_id + '/menu_structure', { preserveSnapshot: true });
  }
  setTable(i: number) {
    this.table = i;
  }
  getTable() {
    return this.table;
  }
  setUser(i: string) {
    this.user = i;
  }
  getUser() {
    return this.user;
  }
  getAssignedServer(table_key: string) {
    function check(x) {
      if (x == null) {
        return false;
      }
      if (x === null) {
        return false;
      }
      if (typeof x === 'undefined') {
        return false;
      }
      return true;
    }
    var key: string;
    key = null;
    const queryObservable = this.af.database.list('restaurants/'+ this.restaurant_id +'/active_servers', {
      query: {
        orderByChild: 'assigned_tables'
      }
    });
    // subscribe to changes
    var tables: any;
    queryObservable.subscribe(queriedItems => {
      tables = queriedItems;
      for (let t of tables) {
        if(check(t['assigned_tables'])) {
          if(t['assigned_tables'].hasOwnProperty(table_key) > -1) {
            key = t['server_id'];
            return key;
          }
        }
      } 
    });
    return key;
  }
  getReviews() {
    return this.reviews;
  }
  /*
  newSignal(type: string, user: string, table_num: number) {
    
    var signal = new Signal();
    signal.type = type;
    for (let table of this.tableList) {
      if(table.number == table_num) {
        signal.table_id = table.$key;
        signal.table_num = table.number;
      }
    }
    signal.server_id = this.getAssignedServer(signal.table_id);
    signal.user = this.user;
    if (signal.server_id === null) {
      console.log("this server is not active or the table is not assigned");
      this.signalFeed.push(signal);
    } else {
      this.signalFeed.push(signal);
    }
  }
  */
  getMenus() {
    return this.menus;
    // this.menuStructure.subscribe(snap => {
    //   console.log(Object.keys(snap.val()['menus']));
    //   return Object.keys(snap.val()['menus']);
    // });
  }
  // getSections(menuKey: string) {
  //   return this.af.database.list('restaurants/' + this.restaurant_id + '/menu_structure/menus/' + menuKey);
  //   // this.menuStructure.subscribe(snap => {
  //   //   console.log(Object.keys(snap['menus'][menuKey]));
  //   //   return Object.keys(snap['menus'][menuKey]);
  //   // });
  // }
  getSectionItems(menuKey: string, sectionKey: string) {
    // let items = this.af.database.object(
    //   'restaurants/' + this.restaurant_id + '/menu_structure/menus/' + menuKey + '/' + sectionKey + '/items',
    //   { preserveSnapshot: true });
    // items.subscribe(snapshot => {
    //   return snapshot.val();
    // });

    return this.af.database.list('restaurants/' + this.restaurant_id + '/menu_items', {
      query: {
        orderByChild: 'section',
        equalTo: sectionKey
      }
    });

    // this.menuStructure.subscribe(snap => {
    //   return snap['menus'][menuKey];
    // });
  }
  getSelectedItem(menuKey: string, sectionKey: string, itemKey: string) {
    return this.af.database.object('restaurants/' + this.restaurant_id + '/menu_items/' + itemKey);
  }
  getItemNutrition(menuKey: string, sectionKey: string, itemKey: string) {
    return this.af.database.list('restaurants/' + this.restaurant_id + '/menu_items/' + itemKey + '/nutrition_info');
  }
  sectionContains(menuKey: string, sectionKey: string, itemKey: string) {
    let items = this.af.database.object(
      'restaurants/' + this.restaurant_id + '/menu_structure/menus/' + menuKey + '/' + sectionKey + '/items',
      { preserveSnapshot: true });
    items.subscribe(snapshot => {
      console.log(snapshot.val().indexOf(itemKey) > -1);
      return snapshot.val().indexOf(itemKey) > -1;
    });
  }
  getMenuItems() {
    return this.menuItems;
  }
  getSections() {
    return this.af.database.list('restaurants/' + this.restaurant_id + '/menu_sections');
  }
}
