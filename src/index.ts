/**
 * @fileOverview Implementation of a singly linked-list data structure
 * @author Jason S. Jones
 * @license MIT
 */

import { ILinkedList } from './types';
import ListIterator from './lib/list-iterator';
import ListNode from './lib/list-node';

/**
 * Linked list class
 *
 * Implementation of a singulary linked list data structure.  This
 * implementation provides the general functionality of adding nodes to
 * the front or back of the list, as well as removing node from the front
 * or back.  This functionality enables this implemention to be the
 * underlying data structure for the more specific stack or queue data
 * structure.
 *
 */
class LinkedList implements ILinkedList {
    head: ListNode;
    tail: ListNode;
    size: number;
    iterator: ListIterator;

    /**
     * Creates a LinkedList instance.  Each instance has a head node, a tail node
     * and a size, which represents the number of nodes in the list.
     *
     * @constructor
     * @param {array} arr The data to initialize with the list
     */
    constructor(arr?: any[]) {
        this.head = null;
        this.tail = null;
        this.size = 0;

        // add iterator as a property of this list to share the same
        // iterator instance with all other methods that may require
        // its use.  Note: be sure to call this.iterator.reset() to
        // reset this iterator to point the head of the list.
        this.iterator = new ListIterator(this);

        // insert initial nodes
        if (Array.isArray(arr) && arr.length > 0) {
            arr.forEach(element => {
                this.insert(element);
            });
        }
    }

    /**
     * Creates a new Node object with 'data' assigned to the node's data property
     *
     * @param {object|string|number} data The data to initialize with the node
     * @returns {object} Node object intialized with 'data'
     */
    createNewNode(data: any): ListNode {
        return new ListNode(data);
    }

    /**
     * Returns the first node in the list, commonly referred to as the 'head' node
     *
     * @returns {object} the head node of the list
     */
    getHeadNode(): ListNode {
        return this.head;
    }

    /**
     * Returns the last node in the list, commonly referred to as the 'tail' node
     *
     * @returns {object} the tail node of the list
     */
    getTailNode(): ListNode {
        return this.tail;
    }

    /**
     * Determines if the list is empty
     *
     * @returns {boolean} true if the list is empty, false otherwise
     */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * Returns the size of the list, or number of nodes
     *
     * @returns {number} the number of nodes in the list
     */
    getSize(): number {
        return this.size;
    }

    /**
     * Clears the list of all nodes/data
     */
    clear(): void {
        while (!this.isEmpty()) {
            this.removeFirst();
        }
    }

    /**
     * Utility function to iterate over the list and call the fn provided
     * on each node, or element, of the list
     *
     * @param {object} cb The function to call on each node of the list
     */
    forEach(cb: (node: ListNode) => void): void {
        this.iterator.reset();
        this.iterator.each(cb);
    }

    /**
     * Returns an array of all the data contained in the list
     *
     * @returns {array} the array of all the data from the list
     */
    toArray(): ListNode[] {
        const listArray: ListNode[] = [];
        this.forEach(node => {
            listArray.push(node.getData());
        });

        return listArray;
    }

    /**
     * Prints to the console the data property of each node in the list
     */
    printList(): void {
        this.forEach(node => {
            console.log(node.toString());
        });
    }

    /**
     * Inserts a node with the provided data to the end of the list
     *
     * @param {object|string|number} data The data to initialize with the node
     * @returns {boolean} true if insert operation was successful
     */
    insert(data: any): boolean {
        const newNode = this.createNewNode(data);
        if (this.isEmpty()) {
            this.head = this.tail = newNode;
            // reset the iterator so the iterator's 'currentNode'
            // will point to head of the list, which is the node we just
            // added.
            this.iterator.reset();
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size += 1;

        return true;
    }

    /**
     * Inserts a node with the provided data to the front of the list
     *
     * @param {object|string|number} data The data to initialize with the node
     * @returns {boolean} true if insert operation was successful
     */
    insertFirst(data: any): boolean {
        if (this.isEmpty()) {
            this.insert(data);
        } else {
            const newNode = this.createNewNode(data);
            newNode.next = this.getHeadNode();
            this.head = newNode;
            this.size += 1;
        }

        return true;
    }

    /**
     * Inserts a node with the provided data at the index indicated.
     *
     * @param {number} index The index in the list to insert the new node
     * @param {object|string|number} data The data to initialize with the node
     * @returns {boolean} true if insert operation was successful
     */
    insertAt(index: number, data: any): boolean {
        let current = this.getHeadNode(),
            previous = null,
            position = 0;
        const newNode = this.createNewNode(data);

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
    }

    /**
     * Inserts a node before the first node containing the provided data
     *
     * @param {object|string|number} nodeData The data of the node to
     *         find to insert the new node before
     * @param {object|string|number} dataToInsert The data to initialize with the node
     * @returns {boolean} true if insert operation was successful
     */
    insertBefore(nodeData: any, dataToInsert: any): boolean {
        const index = this.indexOf(nodeData);
        return this.insertAt(index, dataToInsert);
    }

    /**
     * Inserts a node after the first node containing the provided data
     *
     * @param {object|string|number} nodeData The data of the node to
     *         find to insert the new node after
     * @param {object|string|number} dataToInsert The data to initialize with the node
     * @returns {boolean} true if insert operation was successful
     */
    insertAfter(nodeData: any, dataToInsert: any): boolean {
        const index = this.indexOf(nodeData);
        const size = this.getSize();

        // check if we want to insert new node after the tail node
        if (index + 1 === size) {
            // if so, call insert, which will append to the end by default
            return this.insert(dataToInsert);
        } else {
            // otherwise, increment the index and insert there
            return this.insertAt(index + 1, dataToInsert);
        }
    }

    /**
     * Removes the tail node from the list
     *
     * There is a slight perfomance cost associated with this operation.
     * In order to remove the tail node a handle to the node before the
     * tail node is required, which requires a O(n) operation.
     *
     * @returns the node that was removed
     */
    remove(): ListNode {
        if (this.isEmpty()) {
            return null;
        }

        // get handle for the tail node
        const nodeToRemove = this.getTailNode();
        this.iterator.reset();

        // if there is only one node in the list, set head and tail
        // properties to null
        if (this.getSize() === 1) {
            this.head = null;
            this.tail = null;

            // more than one node in the list
        } else {
            let current;
            // iterate over the list until we reach the second to last node,
            // the node whose next pointer points the the tail node
            while (this.iterator.hasNext()) {
                current = this.iterator.next();
                if (current.next === this.tail) {
                    // reassign tail the to second to last node
                    this.tail = current;
                    current.next = null;
                }
            }
        }
        this.size -= 1;
        return nodeToRemove;
    }

    /**
     * Removes the head node from the list
     *
     * @returns the node that was removed
     */
    removeFirst(): ListNode {
        if (this.isEmpty()) {
            return null;
        }

        if (this.getSize() === 1) {
            return this.remove();
        }

        const nodeToRemove = this.getHeadNode();
        this.head = this.head.next;
        this.size -= 1;

        return nodeToRemove;
    }

    removeAt(index: number): ListNode {
        throw new Error('Method not implemented.');
    }

    removeNode(data: any): ListNode {
        throw new Error('Method not implemented.');
    }

    indexOf(data: any): number {
        throw new Error('Method not implemented.');
    }

    contains(data: any): boolean {
        throw new Error('Method not implemented.');
    }

    find(data: any): ListNode {
        throw new Error('Method not implemented.');
    }

    findAt(index: number): ListNode {
        throw new Error('Method not implemented.');
    }
}

export default LinkedList;

// (function() {
//     'use strict';

//     var isEqual = require('lodash.isequal');
//     var Iterator = require('./lib/iterator');
//     var Node = require('./lib/list-node');

//         /**
//          * Inserts a node before the first node containing the provided data
//          *
//          * @param {object|string|number} nodeData The data of the node to
//          *         find to insert the new node before
//          * @param {object|string|number} dataToInsert The data to initialize with the node
//          * @returns {boolean} true if insert operation was successful
//          */
//         insertBefore: function(nodeData, dataToInsert) {
//             var index = this.indexOf(nodeData);
//             return this.insertAt(index, dataToInsert);
//         },

//         /**
//          * Inserts a node after the first node containing the provided data
//          *
//          * @param {object|string|number} nodeData The data of the node to
//          *         find to insert the new node after
//          * @param {object|string|number} dataToInsert The data to initialize with the node
//          * @returns {boolean} true if insert operation was successful
//          */
//         insertAfter: function(nodeData, dataToInsert) {
//             var index = this.indexOf(nodeData);
//             var size = this.getSize();

//             // check if we want to insert new node after the tail node
//             if (index + 1 === size) {
//                 // if so, call insert, which will append to the end by default
//                 return this.insert(dataToInsert);
//             } else {
//                 // otherwise, increment the index and insert there
//                 return this.insertAt(index + 1, dataToInsert);
//             }
//         },

//         //################## REMOVE methods ####################

//         /**
//          * Removes the node at the index provided
//          *
//          * @param {number} index The index of the node to remove
//          * @returns the node that was removed
//          */
//         removeAt: function(index) {
//             var current = this.getHeadNode(),
//                 previous = null,
//                 position = 0;

//             // check for index out-of-bounds
//             if (index < 0 || index > this.getSize() - 1) {
//                 return null;
//             }

//             // if index is 0, we just need to remove the first node
//             if (index === 0) {
//                 return this.removeFirst();
//             }

//             // if index is size-1, we just need to remove the last node,
//             // which remove() does by default
//             if (index === this.getSize() - 1) {
//                 return this.remove();
//             }

//             while (position < index) {
//                 previous = current;
//                 current = current.next;
//                 position += 1;
//             }

//             previous.next = current.next;
//             this.size -= 1;

//             return current;
//         },

//         /**
//          * Removes the first node that contains the data provided
//          *
//          * @param {object|string|number} nodeData The data of the node to remove
//          * @returns the node that was removed
//          */
//         removeNode: function(nodeData) {
//             var index = this.indexOf(nodeData);
//             return this.removeAt(index);
//         },

//         //################## FIND methods ####################

//         /**
//          * Returns the index of the first node containing the provided data.  If
//          * a node cannot be found containing the provided data, -1 is returned.
//          *
//          * @param {object|string|number} nodeData The data of the node to find
//          * @returns the index of the node if found, -1 otherwise
//          */
//         indexOf: function(nodeData) {
//             this.iterator.reset();
//             var current;
//             var index = 0;

//             // iterate over the list (keeping track of the index value) until
//             // we find the node containg the nodeData we are looking for
//             while (this.iterator.hasNext()) {
//                 current = this.iterator.next();
//                 if (isEqual(current.getData(), nodeData)) {
//                     return index;
//                 }
//                 index += 1;
//             }

//             // only get here if we didn't find a node containing the nodeData
//             return -1;
//         },

//         /**
//          * Determines whether or not the list contains the provided nodeData
//          *
//          * @param {object|string|number} nodeData The data to check if the list
//          *        contains
//          * @returns the true if the list contains nodeData, false otherwise
//          */
//         contains: function(nodeData) {
//             if (this.indexOf(nodeData) > -1) {
//                 return true;
//             } else {
//                 return false;
//             }
//         },

//         /**
//          * Returns the fist node containing the provided data.  If a node
//          * cannot be found containing the provided data, -1 is returned.
//          *
//          * @param {object|string|number} nodeData The data of the node to find
//          * @returns the node if found, -1 otherwise
//          */
//         find: function(nodeData) {
//             this.iterator.reset();

//             var current;
//             // iterate over the list until we find the node containing the data
//             // we are looking for
//             while (this.iterator.hasNext()) {
//                 current = this.iterator.next();

//                 if (isEqual(current.getData(), nodeData)) {
//                     return current;
//                 }
//             }

//             // only get here if we didn't find a node containing the nodeData
//             return -1;
//         },

//         /**
//          * Returns the node at the location provided by index
//          *
//          * @param {number} index The index of the node to return
//          * @returns the node located at the index provided.
//          */
//         findAt: function(index) {
//             // if idx is out of bounds or fn called on empty list, return -1
//             if (this.isEmpty() || index > this.getSize() - 1) {
//                 return -1;
//             }

//             // else, loop through the list and return the node in the
//             // position provided by idx.  Assume zero-based positions.
//             var node = this.getHeadNode();
//             var position = 0;

//             while (position < index) {
//                 node = node.next;
//                 position += 1;
//             }

//             return node;
//         },

//         //################## UTILITY methods ####################

//         /**
//          * Utility function to iterate over the list and call the fn provided
//          * on each node, or element, of the list
//          *
//          * param {object} fn The function to call on each node of the list
//          */
//         forEach: function(fn) {
//             this.iterator.reset();
//             this.iterator.each(fn);
//         },

//         /**
//          * Returns an array of all the data contained in the list
//          *
//          * @returns {array} the array of all the data from the list
//          */
//         toArray: function() {
//             var listArray = [];
//             this.forEach(function(node) {
//                 listArray.push(node.getData());
//             });

//             return listArray;
//         },

//         /**
//          * Prints to the console the data property of each node in the list
//          */
//         printList: function() {
//             this.forEach(function(node) {
//                 /* eslint-disable no-console */
//                 console.log(node.toString());
//             });
//         }
//     };

//     module.exports = LinkedList;
// })();
