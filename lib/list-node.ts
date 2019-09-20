/**
 * @fileOverview Implementation of a singly linked list node
 * @author Jason S. Jones
 * @license MIT
 */

import { IListNode } from '../types';

/**
 * Linked list node class
 *
 * Represents a node within a linked list.  Each node has a 'data' property
 * and a pointer the next node in the list.
 *
 */
class ListNode implements IListNode {
    data: any;
    next: ListNode | null;

    /**
     * Creates a list node object with a data property and pointer
     * to the next node
     *
     * @constructor
     * @param {any} data The data to initialize the node
     */
    constructor(data: any) {
        this.data = data;
        this.next = null;
    }

    /**
     * Returns whether or not the list node has a pointer to the next node
     *
     * @returns {boolean} true if there is a next node; false otherwise
     */
    hasNext(): boolean {
        return this.next !== null;
    }

    /**
     * Gets the list node's data
     *
     * @returns {any} the data of the node
     */
    getData(): any {
        return this.data;
    }

    /**
     * Returns a string represenation of the node.  If the data is an
     * object, it returns the JSON.stringify version of the object.
     * Otherwise, it simply returns the data
     *
     * @return {string} the string represenation of the node data
     */
    toString(): string {
        if (typeof this.data === 'object') {
            return JSON.stringify(this.data);
        } else {
            return String(this.data);
        }
    }
}

export default ListNode;
