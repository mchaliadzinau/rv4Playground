// TEMP
let proxyConfFactory = (nodeRef, name) => ({
    apply: function(target, thisArg, argumentsList) {
        return thisArg[target].apply(this, argumentList);
    },
    deleteProperty: function(target, property) {
        console.log("Deleted %s", property);
        nodeRef.trigger(name+'Change');
        return true;
    },
    set: function(target, property, value, receiver) {      
        target[property] = value;
        console.log("Set %s to %o", property, value);
        nodeRef.trigger(name+'Change');
        return true;
    }
})
// TEMP END

rv4.addNode({
    name: "problems",
    template: ``,
    nodeRef: null,
    vars: {
        /**
         * Should be generated automatically
         * nodeRef is just for easier access to node
         */
        nodeRef: null,
        _searchString : 'asds',
            get searchString() {
                return this._searchString;
            },
            set searchString(value) {
                this._searchString = value;
                this.nodeRef.trigger('searchStringChange');
            },
        _problemsList : null,
            get problemsList() {
                // TO DO refactor Proxy initialization
                if(!this._problemsList) {
                    this._problemsList = new Proxy(
                        [
                            {
                                problem: '1',
                                solution: '2',
                                problemTags: '3',
                                solutionTags: '4'
                            },
                            {
                                problem: '5',
                                solution: '6',
                                problemTags: '7',
                                solutionTags: '8'
                            },
                        ],
                        proxyConfFactory(this.nodeRef,"problemsList")
                   )
                }
                return this._problemsList;
            },
            set problemsList(value) {
                // create new proxy
                this._problemsList = new Proxy(value, proxyConfFactory(this.nodeRef,"problemsList"))
                this.nodeRef.trigger('problemsListChange');
            },
        _additionJSON: '{\n\t"problem": "1",\n\t"solution": "2",\n\t"problemTags": "3",\n\t"solutionTags": "4"\n}',
        get additionJSON() {
            return this._additionJSON;
        },
        set additionJSON(value) {
            // validation logic example
            try {
                JSON.parse(value);
                this._additionJSON = value;
                this.nodeRef.trigger('problemsListChange');
            } catch(e) {
                alert(e);
                this.nodeRef.trigger('additionJSONChange'); // preventing wrong JSON by restoration of previous value of control
            }
        },
        /** NODE LOGIC */
        addProblemWithJSON(jsonString) {
            try {
                this.problemsList.push(JSON.parse(jsonString))
            } catch (e) {

            }
        }
    },
    logic: {
    }
})