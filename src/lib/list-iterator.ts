/**
 * @fileOverview Implementation of an iterator for a linked list
 *               data structure
 * @author Jason S. Jones
 * @license MIT
 */

import { IListIterator, ILinkedList, IListNode } from '../types';

/**
 * Iterator class
 *
 * Represents an instantiation of an iterator to be used
 * within a linked list.  The iterator will provide the ability
 * to iterate over all nodes in a list by keeping track of the
 * postition of a 'currentNode'.  This 'currentNode' pointer
 * will keep state until a reset() operation is called at which
 * time it will reset to point the head of the list.
 *
 * Even though this iterator class is inextricably linked
 * (no pun intended) to a linked list instantiation, it was removed
 * from within the linked list code to adhere to the best practice
 * of separation of concerns.
 *
 */
class ListIterator implements IListIterator {
    list: ILinkedList;
    currentNode: IListNode;

    /**
     * Creates an iterator instance to iterate over the linked list provided.
     *
     * @constructor
     * @param {object} theList the linked list to iterate over
     */
    constructor(theList: ILinkedList) {
        this.list = theList;

        // a pointer the current node in the list that will be returned.
        // initially this will be null since the 'list' will be empty
        this.currentNode = null;
    }

    next(): IListNode {
        const current = this.currentNode;
        // a check to prevent error if randomly calling next() when
        // iterator is at the end of the list, meaining the currentNode
        // will be pointing to null.
        //
        // When this function is called, it will return the node currently
        // assigned to this.currentNode and move the pointer to the next
        // node in the list (if it exists)
        if (this.currentNode !== null) {
            this.currentNode = this.currentNode.next;
        }

        return current;
    }

    /**
     * Determines if the iterator has a node to return
     *
     * @returns true if the iterator has a node to return, false otherwise
     */
    hasNext(): boolean {
        return this.currentNode !== null;
    }

    /**
     * Resets the iterator to the beginning of the list.
     */
    reset(): void {
        this.currentNode = this.list.getHeadNode();
    }

    /**
     * Returns the first node in the list and moves the iterator to
     * point to the second node.
     *
     * @returns the first node in the list
     */
    first(): IListNode {
        this.reset();
        return this.next();
    }

    /**
     * Sets the list to iterate over
     *
     * @param {object} theList the linked list to iterate over
     */
    setList(theList: ILinkedList): void {
        this.list = theList;
        this.reset();
    }

    /**
     * Iterates over all nodes in the list and calls the provided callback
     * function with each node as an argument.
     *
     * @param {function} callback the callback function to be called with
     *                   each node of the list as an arg
     */
    each(callback: (node: IListNode) => void): void {
        this.reset();
        let listNode: IListNode;
        while (this.hasNext()) {
            listNode = this.next();
            callback(listNode);
        }
    }
}

export default ListIterator;
