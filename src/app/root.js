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
    },
    tree: {
    },
    nodes: {},
    addNode(node) {
        this.nodes[node.name] = node;
    }
}

function initAppTree() {
    let rv4s = rv4.q('*[rv4]'); // root nodes;
    // LOOP THROUGH ROOT NODES
    rv4s.forEach(root=>{
        let node = rv4.q(root);
        observeDOM( node[0] ,function(mutations){ console.log('dom ',mutations)});
        let rootName = node.attr('rv4'); // ROOT NODE NAME
        rv4.tree[rootName] = rv4.nodes[rootName];
        rv4.tree[rootName].nodeRef = node;
        rv4.tree[rootName].vars.nodeRef = node;
        // LOOP THROUGH FOR NODES
        let rv4Fors = rv4.q('*[rv4For]',root);
        rv4Fors.forEach(f=>{
            let node = rv4.q(f);
            let dataName = node.attr('rv4For');
            let data = rv4.tree[rootName].vars[dataName];

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
            let data = rv4.tree[rootName].vars[dataName];
            node.val(data);
            rv4.q(root).on(dataName+'Change',(event)=>{
                    let data = rv4.tree[rootName].vars[dataName];
                    node.val(data);
            })
        })

        // LOOP THROUGH OUTPUTS
        let rv4Outs = rv4.q('*[rv4Out]',root);
        rv4Outs.forEach(i=>{
            let node = rv4.q(i);
            let dataName = node.attr('rv4Out');
            node.on('change',function(event){
                rv4.tree[rootName].vars[dataName] = event.target.value;
            });
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

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback(mutations);
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };
})();

// Observe a specific DOM element:
