(function() {

    /**************************************************
     * Linked list node object
     *
     * Internal private class to represent a node within
     * a linked list.  Each node has a 'data' property and
     * a pointer the the next node in the list.
     *
     ***************************************************/
    function Node(data) {
        this.data = data || null;
        this.next = null;
    }

    Node.prototype = {

        hasNext: function() {
            return (this.next != null);
        },

        getData: function() {
            return this.data;
        },

        toString: function() {
            if (typeof this.data === 'object') {
                return JSON.stringify(this.data);
            } else {
                return this.data;
            }
        }
    };


    /**************************************************
     * Linked list object
     *
     * Implementation of a singulary linked list data structure.  This
     * implementation provides the general functionality of adding nodes to
     * the front or back of the list, as well as removing node from the front
     * or back.  This functionality enables this implemention to be the
     * underlying data structure for the more specific stack or queue data
     * structure.
     *
     ***************************************************/
    function LinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

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

        add: function(data) {
            var newNode = new Node(data);
            if (this.isEmpty()) {
                this.head = this.tail = newNode;
            } else {
                this.tail.next = newNode;
                this.tail = newNode;
            }
            this.size += 1;
        },

        addFirst: function(data) {
            if (this.isEmpty()) {
                this.add(data);
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
                while (current != null) {
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
            while (current != null) {
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
            while (current != null) {
                console.log(current.toString());
                current = current.next;
            }
        }

    };
    module.exports = LinkedList;
})();
