/**
 * @fileOverview Implementation of a singulary linked-list data structure
 * @author Jason S. Jones
 * @version 0.0.1
 */

(function() {
    'use strict';

    /**************************************************
     * Linked list node class
     *
     * Internal private class to represent a node within
     * a linked list.  Each node has a 'data' property and
     * a pointer the the next node in the list.
     *
     * Since the 'Node' function is not assigned to
     * module.exports it is not visible outside of this
     * file, therefore, it is private to the LinkedList
     * class.
     *
     ***************************************************/

    /**
     * Creates a node object with a data property and pointer
     * to the next node
     *
     * @constructor
     * @param {object|number|string} data The data to initialize with the node
     */
    function Node(data) {
        this.data = data || null;
        this.next = null;
    }

    // Functions attached to the Node prototype.  All node instances will
    // share these methods, meaning there will NOT be copies made for each
    // instance.  This will be a huge memory savings since there will likely
    // be a large number of individual nodes.
    Node.prototype = {

        /**
         * Returns whether or not the node has a pointer to the next node
         *
         * @returns {boolean} true if there is a next node; false otherwise
         */
        hasNext: function() {
            return (this.next !== null);
        },

        /**
         * Returns the data of the the node
         *
         * @returns {object|string|number} the data of the node
         */
        getData: function() {
            return this.data;
        },

        /**
         * Returns a string represenation of the node.  If the data is an object,
         * it returns the JSON.stringify version of the object.  Otherwise, it
         * simply returns the data
         *
         * @return {string} the string represenation of the node data
         */
        toString: function() {
            if (typeof this.data === 'object') {
                return JSON.stringify(this.data);
            } else {
                return String(this.data);
            }
        }
    };


    /**************************************************
     * Linked list class
     *
     * Implementation of a singulary linked list data structure.  This
     * implementation provides the general functionality of adding nodes to
     * the front or back of the list, as well as removing node from the front
     * or back.  This functionality enables this implemention to be the
     * underlying data structure for the more specific stack or queue data
     * structure.
     *
     ***************************************************/

    /**
     * Creates a LinkedList instance.  Each instance has a head node, a tail node
     * and a size, which represents the number of nodes in the list.
     *
     * @constructor
     */
    function LinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Functions attached to the Linked-list prototype.  All linked-list instances
    // will share these methods, meaning there will NOT be copies made for each
    // instance.  This will be a huge memory savings since there may be several different
    // linked lists.
    LinkedList.prototype = {

        /**
        * Creates a new Node object with 'data' assigned to the node's data property
        *
        * @param {object|string|number} data The data to initialize with the node
        * @returns {object} Node object intialized with 'data'
        */
        createNewNode: function(data) {
            return new Node(data);
        },

        /**
        * Returns the first node in the list, commonly referred to as the 'head' node
        *
        * @returns {object} the head node of the list
        */
        getHeadNode: function() {
            return this.head;
        },

        /**
        * Returns the last node in the list, commonly referred to as the 'tail' node
        *
        * @returns {object} the tail node of the list
        */
        getTailNode: function() {
            return this.tail;
        },

        /**
        * Determines if the list is empty
        *
        * @returns {boolean} true if the list is empty, false otherwise
        */
        isEmpty: function() {
            return (this.size === 0);
        },

        /**
        * Returns the size of the list, or number of nodes
        *
        * @returns {number} the number of nodes in the list
        */
        getSize: function() {
            return this.size;
        },

        //################## INSERT methods ####################

        /**
        * Inserts a node with the provided data to the end of the list
        *
        * @param {object|string|number} data The data to initialize with the node
        * @returns {boolean} true if insert operation was successful
        */
        insert: function(data) {
            var newNode = this.createNewNode(data);
            if (this.isEmpty()) {
                this.head = this.tail = newNode;
            } else {
                this.tail.next = newNode;
                this.tail = newNode;
            }
            this.size += 1;

            return true;
        },

        /**
        * Inserts a node with the provided data to the front of the list
        *
        * @param {object|string|number} data The data to initialize with the node
        * @returns {boolean} true if insert operation was successful
        */
        insertFirst: function(data) {
            if (this.isEmpty()) {
                this.insert(data);
            } else {
                var newNode = this.createNewNode(data);
                newNode.next = this.getHeadNode();
                this.head = newNode;
                this.size += 1;
            }

            return true;
        },

        insertAt: function (index, data) {
            var current = this.getHeadNode(),
                newNode = this.createNewNode(data),
                previous = null,
                position = 0;

            // check for index out-of-bounds
            if (index < 0 || index > this.getSize() - 1) {
               return false;
            }

            // if index is 0, we just need to insert the first node
            if (index === 0) {
                this.insertFirst(data);
                return true;
            }

            while (position < index) {
               previous = current;
               current = current.next;
               position += 1;
            }

            previous.next = newNode;
            newNode.next = current;
            this.size += 1;

            return true;
        },

        // TODO: implement insertBefore(nodeData) function
        // TODO: implement insertAfter(nodeData) function

        //################## REMOVE methods ####################
        
        remove: function() {
            if (this.isEmpty()) {
                return null;
            }

            var nodeToRemove = this.getTailNode();
            if (this.getSize() === 1) {
                this.head = null;
                this.tail = null;
            } else {
                var current = this.getHeadNode();
                while (current !== null) {
                    if (current.next === this.tail) {
                        this.tail = current;
                        current.next = null;
                    }
                    current = current.next;
                }
            }
            this.size -= 1;

            return nodeToRemove;
        },

        removeFirst: function() {
            if (this.isEmpty()) {
                return null;
            }
            var nodeToRemove = this.getHeadNode();
            this.head = this.head.next;
            this.size -= 1;

            return nodeToRemove;
        },

        removeAt: function (index) {
            var current = this.getHeadNode(),
                previous = null,
                position = 0;

            // check for index out-of-bounds
            if (index < 0 || index > this.getSize() - 1) {
               return null;
            }

            // if index is 0, we just need to remove the first node
            if (index === 0) {
                return this.removeFirst();
            }

            // if index is size-1, we just need to remove the last node,
            // which remove() does by default.
            if (index === this.getSize() - 1) {
                return this.remove();
            }

            while (position < index) {
               previous = current;
               current = current.next;
               position += 1;
            }

            previous.next = current.next;
            this.size -= 1;

            return current;
        },

        removeNode: function (nodeData) {
            var index = this.indexOf(nodeData);
            return this.removeAt(index);
        },

        indexOf: function(nodeData) {
            var current = this.getHeadNode();
            var index = 0;
            while (current !== null) {
                if (current.getData() === nodeData) {
                    return index;
                }
                index += 1;
                current = current.next;
            }
            return -1;
        },

        //################## FIND methods ####################
        
        findNode: function(nodeData) {
            var current = this.getHeadNode();
            while (current !== null) {
                if (current.getData() === nodeData) {
                    return current;
                }
                current = current.next;
            }

            return -1;
        },

        findNodeAt: function(index) {
            // if idx is out of bounds or fn called on empty list, return -1
            if (this.isEmpty() || index > this.getSize() - 1) {
                return -1;
            }

            // else, loop through the list and return the node in the position provided
            // by idx.  Assume zero-based positions.
            var node = this.getHeadNode();
            var position = 0;

            while (position < index) {
                node = node.next;
                position += 1;
            }

            return node;
        },

        // this may no longer be necessary...
        getNodeBefore: function(nodeData) {
            // need to have at least 2 nodes in the list to be able to get
            // a node before some another
            if (this.getSize() < 2) {
                return -1;
            } else {
                // set the current node to the beginning of the list
                var current = this.getHeadNode();

                // iterate over the list until we reach the second to last node.
                // Since we are looking a the data of the next node, no need
                // to iterate all the way to the tail.
                while (current.hasNext()) {
                    // look forward to the data of the next node and check if it what
                    // we are looking for.  If it is, return the current node, which will
                    // be the node before the one with the 'nodeData', and precisely the one
                    // we are looking for.
                    if (current.next.getData() === nodeData) {
                        return current;
                    }

                    // move the the next node
                    current = current.next;
                }
                // no node's data matched 'nodeData', so return -1
                return -1;
            }
        },

        //################## UTILITY methods ####################
        
        forEach: function(fn) {
            var current = this.getHeadNode();
            while (current !== null) {
                fn(current);
                current = current.next;
            }
        },

        printList: function() {
            this.forEach(function(node) {
                console.log(node.toString());
            });
        }

    };

    module.exports = LinkedList;

})();
