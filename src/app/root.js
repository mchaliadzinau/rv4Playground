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
        node.html(rv4.tree[rootName].template);
        // LOOP THROUGH FOR NODES
        let rv4Fors = rv4.q('*[rv4For]',root);
        rv4Fors.forEach(f=>{
            let node = rv4.q(f);
            let dataName = node.attr('rv4For');
            let parent = node.parent();


            function loopThroughForinNodes(rv4ForNode,item) {
                let rv4ForIns = rv4.q('*[rv4ForIn]',rv4ForNode);
                rv4ForIns.forEach(forIn=>{
                    let forInVarName = forIn.attributes['rv4ForIn'].value;
                    forIn.innerText = item[forInVarName];
                })
            }
            
            function loopThroughForClickNodes(rv4ForNode,idx) {
                let rv4ForClicks = rv4.q('*[rv4ForClick]',rv4ForNode);
                rv4ForClicks.forEach(rv4ForClick=>{
                    let value = rv4ForClick.attributes['rv4ForClick'].value;
                    value=value.replace("$index",idx);
                    rv4ForClick.onclick = new Function('rv4.tree["'+rootName+'"].vars.'+value);
                })
            }

            rv4.tree[rootName].vars[dataName].forEach((item,idx,arr)=>{
                let newNode = node.clone();
                parent.append(newNode);

                // LOOP THROUGH FORIN NODES
                loopThroughForinNodes(newNode[0],item);

                // LOOP THROUGH FORCLICK NODES
                loopThroughForClickNodes(newNode[0],idx)
            })

            rv4.q(root).on(dataName+'Change',function(event){
                console.log(dataName+'Change');
                parent.html('');
                rv4.tree[rootName].vars[dataName].forEach((item,idx,arr)=>{
                    let newNode = node.clone();
                    parent.append(newNode);
                    // LOOP THROUGH FORIN NODES
                    loopThroughForinNodes(newNode[0],item);
                    // LOOP THROUGH FORCLICK NODES
                    loopThroughForClickNodes(newNode[0],idx)

                })
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


        // LOOP THROUGH CLICK HANDLERS
        let rv4OnClicks = rv4.q('*[onclick]',root);
        rv4OnClicks.forEach(i=>{
            let node = rv4.q(i);
            let clickHandler = node[0].onclick;
            node[0].onclick = (event)=>{
                clickHandler.apply(rv4.tree[rootName].vars)
            }
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
