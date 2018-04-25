# rv4Knowledge
knowledge management tool

## ARCHITECTURE
### General statements
    1) Everything is build around nodes
    2) nodes cannot be nested yet (and, probably, never will be)
    3) each node is a separate scope with 3 layers: DOM, Data, Logic
    4) interactions between nodes are done via services

### Directives
* rv4="{nodename}"
    
        node root

* rv4In="{varname}" 

        input data for element (data that will be placed in DOM)

* rv4Out="{varname}" 

        output data of element (data that will be taken from DOM onchange)

* rv4IO="{varname}"  // TO DO

        combine rv4In and rv4Out directive in one if {varname} is the same

* rv4For="{arrname}"

        repeats element until not all elements of {arrname} shown
        
        * Currently only objects can be in array since rv4ForIn requres property name

    * rv4ForIn="{objProperty}"

        name of property serving as input data for DOM element

    * rv4ForClick="{funcCall()}"

        executes function bound to current node

        * replaces $index with index of current element item


