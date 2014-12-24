/**
 * @fileOverview Implementation of a singulary linked-list data structure
 * @author Jason S. Jones
 * @version 0.0.1
 */

(function() {

    /**************************************************
     * Linked list node class
     *
     * Internal private class to represent a node within
     * a linked list.  Each node has a 'data' property and
     * a pointer the the next node in the list.
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
                return this.data;
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

        getHeadNode: function() {
            return this.head;
        },

        getTailNode: function() {
            return this.tail;
        },

        isEmpty: function() {
            return (this.size === 0);
        },

        getSize: function() {
            return this.size;
        },

        insert: function(data) {
            var newNode = new Node(data);
            if (this.isEmpty()) {
                this.head = this.tail = newNode;
            } else {
                this.tail.next = newNode;
                this.tail = newNode;
            }
            this.size += 1;
        },

        insertFirst: function(data) {
            if (this.isEmpty()) {
                this.insert(data);
            } else {
                var newNode = new Node(data);
                newNode.next = this.getHeadNode();
                this.head = newNode;
                this.size += 1;
            }
        },

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

        findNodeAtIndex: function(idx) {
            // if idx is out of bounds or fn called on empty list, return -1
            if (this.getSize() < idx || this.isEmpty()) {
                return -1;
            }

            // else, loop through the list and return the node in the position provided
            // by idx.  Assume zero-based positions.
            var node = this.getHeadNode();

            for (var i = 0; i < idx; i++) {
                node = node.next;
            }

            return node;

        },

        getNodeBefore: function(nodeData) {
            // need to have at least 2 nodes in the list to be able to have
            // one node before some another
            if (this.getSize() < 2) {
                return -1;
            } else {
                // set the current node to the beginning of the list
                var current = this.getHeadNode();

                // iterate over the list until we reach the second to last node.
                // Since we are looking a the data of the next node, no need
                // to iterate all the way to the tail.
                while (current.hasNext()) {
                    if (current.next.getData() === nodeData) {
                        return current;
                    }
                    current = current.next;
                }
                return -1;
            }
        },

        printList: function() {
            var current = this.getHeadNode();
            while (current !== null) {
                console.log(current.toString());
                current = current.next;
            }
        }

    };

    module.exports = LinkedList;

})();
