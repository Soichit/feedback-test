"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var _1 = require('./app/');
var angularfire2_1 = require('angularfire2');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.AppComponent, [
    angularfire2_1.FIREBASE_PROVIDERS,
    // Initialize Firebase app
    angularfire2_1.defaultFirebase({
        apiKey: "AIzaSyCbmPbfVH4cIXc3YPlFIMK5DmIUCVev638",
        authDomain: "todo-82111.firebaseapp.com",
        databaseURL: "https://todo-82111.firebaseio.com",
        storageBucket: "todo-82111.appspot.com",
    })
]);
//# sourceMappingURL=main.js.map