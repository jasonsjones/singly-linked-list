[![version][npm-image]][npm-url]
[![Build Status][circleci-image]][circleci-url]
[![dependency status][dm-image]][dm-url]
[![devDependency status][devdep-image]][devdep-url]
[![npm](https://img.shields.io/npm/l/queue-fifo.svg?style=flat-square)]()

# Singly Linked List

## Description

This is a javascript implementation of a [singly linked
list](http://en.wikipedia.org/wiki/Linked_list) data structure.

In simple terms, a singly linked list is a data structure that consists of one
or more 'nodes'. Each node has a data field (which can contain any data--a
primitive value or complex object) and a pointer to the next 'node'.
This differs from a 'doubly linked list' in that it does NOT contain a
reference, or link, to the previous node. The implication of this means one
can only traverse the list in one direction, starting from the head node. The
idea of having a link to the next node is where this data structure gets its
descriptive name.

This implementation provides basic functionality of adding nodes to the front
or back of the list, as well as the ability to insert a node at a given
position in the list. It also provides the ability to remove nodes at the
front or back of the list, or from any given position.

The find, or search, functionality provides the ability to find the first node
containing specified data. It also provides the ability to find a node given a
specific position, or index, in the list.

_For specific examples and documentation, see the below sections_

### Motivation:

The main purpose of this project is revisit the basics, and focus on the
development process.

_I wholehearedly acknowledge that the basic data structure space is populated
with well-written code and efficient implementations, and one could easily grab
one of those libraries and integrate it in their project. However, the main
difference between those libraries/implementations and this one is that this is
the best implementation I have ever written. My hope is that someone else will
find this useful, but understand, this code is not the goal; this will simply
be a useful bi-product of the journey. The underlying motivation is to
understand and, more importantly, learn from the process to get to the desired
end-state&mdash;for me it is all about the joy of the journey._

#### Environment:

Although this implementation is designed to be used with
[Node.js](http://www.nodejs.org), it could be used in other contexts with minor
modifications. This implementation does not have any external dependencies
that would preclude it from being used in the browser--just include it with a
`<script>` tag and it should be good to go. _Disclaimer: I have not tested
this implementation in any other context/environment; only tested with node.js_

---

## Basic Usage

Install with npm :

```bash
npm install singly-linked-list --save
```

Basic usage example below. _Note: it does not cover all the available
methods, rather just highlights the main functionality to get up and running
with this data structure. For a description of all the methods, see the
API section._

```javascript
var LinkedList = require('singly-linked-list');
var list = new LinkedList();

list.isEmpty();
// --> true

list.insert('data item 1');
list.insert('data item 2');
list.insert('data item 3');
list.insert('data item 4');
// list contains:
// 'data item 1', ... ,'data item 4'

// alternatively, the list can be initialized with an array
var initialData = ['data item 1', 'data item 2', 'data item 3', 'data item 4'];
var populatedList = new LinkedList(initialData);
// populatedList contains:
// 'data item 1', ... ,'data item 4'

list.isEmpty();
// --> false

list.getSize();
// --> 4

list.insertFirst('data item 0');
// list contains:
// 'data item 0', ... ,'data item 4'

list.getHeadNode().getData();
// --> 'data item 0'

list.remove();
// --> removes 'data item 4'

list.removeFirst();
// --> removes 'data item 0'

list.getHeadNode().getData();
// --> 'data item 1'

list.clear();
list.isEmpty();
// --> true
```

## API

**Available methods for a singly-linked-list instance:**

-   ### getHeadNode()

    Returns the first node in the list

-   ### getTailNode()

    Returns the last node in the list

-   ### isEmpty()

    Determines if the list is empty or not. Returns true if is empty, false
    otherwise.

-   ### getSize()

    Returns the size of the list, or number of nodes

-   ### clear()

    Clears the list of all nodes/data

-   ### insert(data)

    Inserts a node (with the provided `data`) to the end of the list

-   ### insertFirst(data)

    Inserts a node (with the provided `data`) to the front of the list

-   ### insertAt(index, data)

    Inserts a node (with the provided `data`) at the `index` indicated.

-   ### insertBefore(nodeData, dataToInsert)

    Inserts a node (with the `dataToInsert`) _before_ the first node containing
    `nodeData`

-   ### insertAfter(nodeData, dataToInsert)

    Inserts a node (with the `dataToInsert`) _after_ the first node containing
    `nodeData`

-   ### remove()

    Removes the tail node from the list

-   ### removeFirst()

    Removes the head node from the list

-   ### removeAt(index)

    Removes the node at the `index` provided

-   ### removeNode(nodeData)

    Removes the first node that contains the `nodeData` provided

-   ### indexOf(nodeData)

    Returns the index of the first node containing the provided `nodeData`. If
    a node cannot be found containing the provided data, -1 is returned.

-   ### contains(nodeData)

    Determines whether or not the list contains the provided `nodeData`

-   ### find(nodeData)

    Returns the fist node containing the provided `nodeData`. If a node
    cannot be found containing the provided data, -1 is returned.

-   ### findAt(index)

    Returns the node at the location provided by `index`

-   ### forEach(fn)

    Utility function to iterate over the list and call the `fn` provided
    on each node, or element, of the list

-   ### toArray()

    Returns an array of all the data contained in the list

-   ### printList()
    Prints to the console the data property of each node in the list

**Available methods for an individual node instance:**

-   ### getData()

    Returns the data of the the node

-   ### hasNext()

    Returns whether or not the node has a pointer to the next node

-   ### toString()
    Returns a string represenation of the node. If the data is an object,
    it returns the JSON.stringify version of the object. Otherwise, it
    simply returns the data

---

## License

MIT &copy; Jason Jones

[npm-image]: https://img.shields.io/npm/v/singly-linked-list.svg?style=flat-square
[npm-url]: http://npmjs.org/package/singly-linked-list
[circleci-image]: https://img.shields.io/circleci/project/github/jasonsjones/singly-linked-list.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/jasonsjones/singly-linked-list
[dm-image]: https://img.shields.io/david/jasonsjones/singly-linked-list.svg?style=flat-square
[dm-url]: https://david-dm.org/jasonsjones/singly-linked-list
[devdep-image]: https://img.shields.io/david/dev/jasonsjones/singly-linked-list.svg?style=flat-square
[devdep-url]: https://david-dm.org/jasonsjones/singly-linked-list#info=devDependencies
