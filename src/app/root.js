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
    init: (windw,jqlite)=>{
        rv4.w = windw;
        rv4.q = jqlite;
        initAppTree();
        windw.window;
    },
    data: {
        'app1': {
            searchString: "aaa",
            problems: [
                "<td>1</td><td>2</td><td>3</td><td>4</td>",
                "<td>5</td><td>6</td><td>7</td><td>8</td>"
            ]
        }
    },
    tree: {

    }
}

function initAppTree() {
    let rv4s = rv4.q('*[rv4]'); // root nodes;
    // LOOP THROUGH ROOT NODES
    rv4s.forEach(root=>{
        let node = rv4.q(root);
        let rootName = node.attr('rv4'); // ROOT NODE NAME
        rv4.tree[rootName] = {
            e: rv4.q(root) // element ref
        }

        // LOOP THROUGH FOR NODES
        let rv4Fors = rv4.q('*[rv4For]',root);
        rv4Fors.forEach(f=>{
            let node = rv4.q(f);
            let dataName = node.attr('rv4For');
            let data = rv4.data[rootName][dataName];

            data.forEach(i=>{
                let newNode = node.clone();
                newNode.html(i);
                node.parent().append(newNode)
            })
        })

        // LOOP THROUGH INPUTS
        let rv4Ins = rv4.q('*[rv4In]',root);
        rv4Ins.forEach(i=>{
            let node = rv4.q(i);
            let dataName = node.attr('rv4In');
            let data = rv4.data[rootName][dataName];
            node.val(data);
        })

        // LOOP THROUGH OUTPUTS
        let rv4Outs = rv4.q('*[rv4Out]',root);
        rv4Outs.forEach(i=>{
            let node = rv4.q(i);
            let dataName = node.attr('rv4Out');
            node.on('change',()=>{
                rv4.data[rootName][dataName] = node.val();
                console.log(node, node.val())
            })
        })

    });

    // on page reload events and handlers
    rv4.w.onbeforeunload = function() {
        alert('onbeforeunload');
    }
    rv4.w.onunload = function() {
        alert('onunload');
    }
}

console.log("root EXECUTION is COMPLETED");