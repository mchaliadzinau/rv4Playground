// Load native UI library
var gui = require('nw.gui'); //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)


console.log("root is LOADED");
/**
 * Global variable
 * .q - DOM query library (jqlite) // q = require('../node_modules/jqlite/jqlite.min.js'),
 */

rv4 = {
    q: null,
    w: null,
    init: (window,jqlite)=>{
        rv4.w = window;
        rv4.q = jqlite;
        initAppTree();
    },
    data: {
        'app1': {
            problems: [
                "<td>1</td><td>2</td><td>3</td><td>4</td>",
                "<td>5</td><td>6</td><td>7</td><td>8</td>"
            ]
        }
    }
}

function initAppTree() {
    let rv4s = rv4.q('*[rv4]'); // root nodes;
    // LOOP THROUGH ROOT NODES
    rv4s.forEach(root=>{
        let rootName = root.attributes['rv4'].value; // ROOT NODE NAME
        // LOOP THROUGH FOR NODES
        let rv4Fors = rv4.q('*[rv4For]',root);
        rv4Fors.forEach(f=>{
            let node = rv4.q(f);
            let dataName = f.attributes['rv4For'].value;
            let data = rv4.data[rootName][dataName];
            data.forEach(i=>{
                let newNode = node.clone();
                newNode.html(i);
                node.parent().append(newNode)
            })
        })
        // console.log(rv4Fors)
    });
    console.log(rv4s)
}

console.log("root EXECUTION is COMPLETED");