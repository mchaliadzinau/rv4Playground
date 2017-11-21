// Load native UI library
var gui = require('nw.gui'); //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)


console.log("root is LOADED");
/**
 * Global variable
 * .q - DOM query library (jqlite) // q = require('../node_modules/jqlite/jqlite.min.js'),
 */

rv4 = {
    q: null,
    w: null
}

console.log("root EXECUTION is COMPLETED");