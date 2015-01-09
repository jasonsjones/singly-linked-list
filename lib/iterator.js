/**
 * @fileOverview Implementation of an iterator for a linked list
 *               data structure
 * @author Jason S. Jones
 * @license MIT
 */

(function () {
    'use strict';

    function Iterator(theList) {
        this.list = theList;
        this.currentNode = this.list.getHeadNode();
    }

    Iterator.prototype = {

        next: function() {
            var current = this.currentNode;
            this.currentNode = this.currentNode.next;

            return current;
        },

        hasNext: function() {
            return this.currentNode !== null;
        },

        reset: function() {
            this.currentNode = this.list.getHeadNode();
        },

        first: function() {
            this.reset();
            return this.currentNode;
        },

        each: function(callback) {
            this.reset();
            var el;
            while (this.hasNext()) {
                el = this.next();
                callback(el);
            }
        }
    };

    module.exports = Iterator;

})();
