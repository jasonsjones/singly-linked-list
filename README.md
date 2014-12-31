# Singly Linked List

## Description

This is a javascript implementation of a [singly linked
list](http://en.wikipedia.org/wiki/Linked_list) data structure.

In simple terms, a singly linked list consists of one or more 'nodes'.  Each
node has a data field (which can contain any data--a primative value or complex
object) and a pointer to the next 'node'. This differs from a 'doubly linked
list` in that it does NOT contain a reference, or link, to the previous node.
The implication of that means one can only traverse the list in one direction,
starting from the head node. The idea of having a link to the next node is
where this data structure got its descriptive name.

This implemenation provides basic functionality of adding nodes to the front or
back of the list, as well as the ability to insert a node at a given position
in the list.  It also provides the ability to remove nodes at the front or back
of the list, or from any given position.

The find, or search, functionality provides the ability to find the first node
containing specified data. It also provides the ability to find a node given a
specific position, or index, in the list.


*For specific examples and documentation, see the below sections*

### Motivation:

*I wholehearedly acknowledge that the basic data structure space is populated
with well-written code and efficient implementations, and one could easily grab
one of those libraries and integrate it in their project.  However, the main
difference between those libraries/implementations and this one is that this is
the best implementation I have ever written.  My hope is that someone else will
find this useful, but understand, this code is not the goal; this will simply
be a useful bi-product of the journey.  The underlying motivation is to
understand and, more importantly, learn from the process to get to the desired
end-state&mdash;for me it is all about the joy of the journey.*

#### Environment:

Although this implementation is designed to be used with
[Node.js](http://www.nodejs.org), it could be used in other contexts with minor
modifications.  _Disclaimer: I have not tested this implementation in any other
context/environment; only tested with node.js_

----

## Basic Usage

```javascript
var LinkedList = require('./linked-list');
var list - new LinkedList();

list.isEmpty(); // true

list.insert('data item 1');
list.insert('data item 2');
list.insert('data item 3');
list.insert('data item 4');

list.isEmpty(); // false
list.getSize(); // 4

list.insertFirst('data item 0');

list.getHeadNode().getData(); // 'data item 0'
list.remove();                // removes 'data item 4'
list.removeFirst();           // removes 'data item 0'
list.getHeadNode().getData(); // 'data item 1'

list.clear();
list.isEmpty(); // true
```

## API

**Available methods for a singly-linked-list instance:**

* ### getHeadNode()
    Returns the first node in the list

* ### getTailNode()
    Returns the last node in the list

* ### isEmpty()
    Determines if the list is empty or not. Returns true if is empty, false
    otherwise.

* ### getSize()
    Returns the size of the list, or number of nodes

* ### clear()
    Clears the list of all nodes/data

* ### insert(data)
    Inserts a node (with the provided `data`) to the end of the list

* ### insertFirst(data)
    Inserts a node (with the provided `data`) to the front of the list

* ### insertAt(index, data)
    Inserts a node (with the provided `data`) at the `index` indicated.

* ### insertBefore(nodeData, dataToInsert)
    Inserts a node (with the `dataToInsert`) _before_ the first node containing
    `nodeData`

* ### insertAfter(nodeData, dataToInsert)
    Inserts a node (with the `dataToInsert`) _after_ the first node containing
    `nodeData`

* ### remove()
    Removes the tail node from the list

* ### removeFirst()
    Removes the head node from the list

* ### removeAt(index)
    Removes the node at the `index` provided

* ### removeNode(nodeData)
    Removes the first node that contains the `nodeData` provided

* ### indexOf(nodeData)
    Returns the index of the first node containing the provided `nodeData`.  If
    a node cannot be found containing the provided data, -1 is returned.

* ### contains(nodeData)
    Determines whether or not the list contains the provided `nodeData`

* ### find(nodeData)
    Returns the fist node containing the provided `nodeData`.  If a node
    cannot be found containing the provided data, -1 is returned.

* ### findAt(index)
    Returns the node at the location provided by `index`

* ### forEach(fn)
    Utility function to iterate over the list and call the `fn` provided
    on each node, or element, of the list

* ### printList()
    Prints to the console the data property of each node in the list

**Available methods for an individual node instance:**

* ### getData()
    Returns the data of the the node

* ### hasNext()
    Returns whether or not the node has a pointer to the next node

* ### toString()
    Returns a string represenation of the node.  If the data is an object,
    it returns the JSON.stringify version of the object.  Otherwise, it
    simply returns the data


**LICENSE (MIT) -- Jason S. Jones**