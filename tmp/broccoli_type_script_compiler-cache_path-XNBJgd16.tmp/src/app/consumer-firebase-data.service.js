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
        var _this = this;
        this.af = af;
        this.restaurant_id = '-KMNBxENcTCY_MjVzLef';
        this.restaurant_name = "Cedar's";
        this.signalFeed = af.database.list('restaurants/' + this.restaurant_id + '/feed');
        this.reviews = af.database.list('restaurants/' + this.restaurant_id + '/reviews');
        this.table = 0;
        var tempTables = af.database.list('restaurants/' + this.restaurant_id + '/tables');
        tempTables.subscribe(function (items) {
            _this.tableList = items;
        });
        this.menuItems = af.database.list('restaurants/' + this.restaurant_id + '/menu_items');
        this.menus = af.database.list('restaurants/' + this.restaurant_id + '/menu_structure/menus');
        this.menuStructure = af.database.object('restaurants/' + this.restaurant_id + '/menu_structure', { preserveSnapshot: true });
    }
    ConsumerFirebaseDataService.prototype.setTable = function (i) {
        this.table = i;
    };
    ConsumerFirebaseDataService.prototype.getTable = function () {
        return this.table;
    };
    ConsumerFirebaseDataService.prototype.setUser = function (i) {
        this.user = i;
    };
    ConsumerFirebaseDataService.prototype.getUser = function () {
        return this.user;
    };
    ConsumerFirebaseDataService.prototype.getAssignedServer = function (table_key) {
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
        var key;
        key = null;
        var queryObservable = this.af.database.list('restaurants/' + this.restaurant_id + '/active_servers', {
            query: {
                orderByChild: 'assigned_tables'
            }
        });
        // subscribe to changes
        var tables;
        queryObservable.subscribe(function (queriedItems) {
            tables = queriedItems;
            for (var _i = 0, tables_1 = tables; _i < tables_1.length; _i++) {
                var t = tables_1[_i];
                if (check(t['assigned_tables'])) {
                    if (t['assigned_tables'].hasOwnProperty(table_key) > -1) {
                        key = t['server_id'];
                        return key;
                    }
                }
            }
        });
        return key;
    };
    ConsumerFirebaseDataService.prototype.getReviews = function () {
        return this.reviews;
    };
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
    ConsumerFirebaseDataService.prototype.getMenus = function () {
        return this.menus;
        // this.menuStructure.subscribe(snap => {
        //   console.log(Object.keys(snap.val()['menus']));
        //   return Object.keys(snap.val()['menus']);
        // });
    };
    // getSections(menuKey: string) {
    //   return this.af.database.list('restaurants/' + this.restaurant_id + '/menu_structure/menus/' + menuKey);
    //   // this.menuStructure.subscribe(snap => {
    //   //   console.log(Object.keys(snap['menus'][menuKey]));
    //   //   return Object.keys(snap['menus'][menuKey]);
    //   // });
    // }
    ConsumerFirebaseDataService.prototype.getSectionItems = function (menuKey, sectionKey) {
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
    };
    ConsumerFirebaseDataService.prototype.getSelectedItem = function (menuKey, sectionKey, itemKey) {
        return this.af.database.object('restaurants/' + this.restaurant_id + '/menu_items/' + itemKey);
    };
    ConsumerFirebaseDataService.prototype.getItemNutrition = function (menuKey, sectionKey, itemKey) {
        return this.af.database.list('restaurants/' + this.restaurant_id + '/menu_items/' + itemKey + '/nutrition_info');
    };
    ConsumerFirebaseDataService.prototype.sectionContains = function (menuKey, sectionKey, itemKey) {
        var items = this.af.database.object('restaurants/' + this.restaurant_id + '/menu_structure/menus/' + menuKey + '/' + sectionKey + '/items', { preserveSnapshot: true });
        items.subscribe(function (snapshot) {
            console.log(snapshot.val().indexOf(itemKey) > -1);
            return snapshot.val().indexOf(itemKey) > -1;
        });
    };
    ConsumerFirebaseDataService.prototype.getMenuItems = function () {
        return this.menuItems;
    };
    ConsumerFirebaseDataService.prototype.getSections = function () {
        return this.af.database.list('restaurants/' + this.restaurant_id + '/menu_sections');
    };
    ConsumerFirebaseDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], ConsumerFirebaseDataService);
    return ConsumerFirebaseDataService;
}());
exports.ConsumerFirebaseDataService = ConsumerFirebaseDataService;
//# sourceMappingURL=consumer-firebase-data.service.js.map