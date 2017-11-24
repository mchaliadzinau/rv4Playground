rv4.addNode({
    name: "problems",
    template: ``,
    nodeRef: null,
    vars: {
        nodeRef: null,
        _searchString : 'asds',
            get searchString() {
                return this._searchString;
            },
            set searchString(value) {
                this._searchString = value;
                this.nodeRef.trigger('searchStringChange');
            },
        _problemsList : [
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
            get problemsList() {
                return this._problemsList;
            },
            set problemsList(value) {
                this._problemsList = value;
                this.nodeRef.trigger('problemsListChange');
            },
    },
    logic: function(){
        
    }
})