rv4.addNode({
    name: "problems",
    template: ``,
    nodeRef: null,
    vars: {
        _searchString : 'asds',
        nodeRef: null,
        get searchString() {
            return this._searchString;
        },
        set searchString(value) {
            this._searchString = value;
            this.nodeRef.trigger('searchStringChange');
        },
        problems: [
            "<td>1</td><td>2</td><td>3</td><td>4</td>",
            "<td>5</td><td>6</td><td>7</td><td>8</td>"
        ]
    },
    logic: function(){
        
    }
})