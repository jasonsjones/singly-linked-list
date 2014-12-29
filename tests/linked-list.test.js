/* globals describe it beforeEach afterEach */

var should = require('should');
var LinkedList = require('../linked-list');

describe('Linked List', function() {
    var list = null;

    // Utility function to populate the list with dummy data.
    // The number of nodes added will be specified by the 'numNodes'
    // parameter.
    var populateList = function (aList, numNodes) {
        for (var i = 0; i < numNodes; i++) {
            aList.insert('test item ' + (i + 1));
        }
    };

    beforeEach(function() {
        list = new LinkedList();
    });

    afterEach(function() {
        list = null;
    });

    it('should have a working test environment', function() {
        true.should.equal(true);
    });

    it('should initially contain zero items', function() {
        list.isEmpty().should.equal(true);
        list.getSize().should.equal(0);
    });

    it('should be able to clear the list', function () {
        populateList(list, 10);
        list.getSize().should.equal(10);
        list.clear();
        list.getSize().should.equal(0);
    });

    describe('insert functionality', function() {
        it('should set the head node equal to the tail node when first item is inserted', function() {
            list.insert('test item 1');
            list.getHeadNode().should.equal(list.getTailNode());
            list.getSize().should.equal(1);
        });

        it('should insert items to the back of the list', function() {
            populateList(list, 3);
            list.isEmpty().should.equal(false);
            list.getSize().should.equal(3);
        });

        it('should insert items to the front of the list', function() {
            list.insert('test item 1');
            list.insertFirst('new item 1');
            list.getHeadNode().data.should.equal('new item 1');
            list.getSize().should.equal(2);
        });

        it('should insert item at a particular index', function() {
            populateList(list, 3);
            list.insert('test item 5');
            list.getSize().should.equal(4);
            var success = list.insertAt(3, 'test item 4');
            success.should.equal(true);
            list.getSize().should.equal(5);
            var node = list.findNodeAt(3);
            node.getData().should.equal('test item 4');
        });

        it('should insert new head node when inserting at index 0', function() {
            populateList(list, 3);
            list.getSize().should.equal(3);
            var success = list.insertAt(0, 'test item 0');
            success.should.equal(true);
            list.getSize().should.equal(4);
            var node = list.getHeadNode();
            node.getData().should.equal('test item 0');
        });

        it('should return false when trying to insert at index out of bounds', function() {
            populateList(list, 3);
            var success = list.insertAt(5, 'test item 4');
            success.should.equal(false);
        });

        it('should insert item before a particular node');
        it('should insert item after a particular node');
    });

    describe('remove functionality', function() {
        it('should return null if remove is called on an empty list', function() {
            var node = list.remove();
            should.not.exist(node);
        });

        it('should remove items from the back of the list', function() {
            populateList(list, 3);
            list.isEmpty().should.equal(false);
            list.getSize().should.equal(3);
            var node = list.remove();
            node.data.should.equal('test item 3');
            list.getTailNode().getData().should.equal('test item 2');
            list.getSize().should.equal(2);
        });

        it('should return null if removeFirst is called on an empty list', function() {
            var node = list.removeFirst();
            should.not.exist(node);
        });

        it('should remove items from the front of the list', function() {
            populateList(list, 3);
            list.isEmpty().should.equal(false);
            list.getSize().should.equal(3);
            var node = list.removeFirst();
            node.getData().should.equal('test item 1');
            list.getHeadNode().getData().should.equal('test item 2');
            list.getSize().should.equal(2);
        });

        it('should remove item at a particulary index', function() {
            populateList(list, 4);
            list.getSize().should.equal(4);
            var node = list.removeAt(1);
            node.getData().should.equal('test item 2');
            list.getSize().should.equal(3);
        });

        it('should remove a node with given data', function() {
            populateList(list, 4);
            list.getSize().should.equal(4);
            var node = list.removeNode('test item 3');
            node.getData().should.equal('test item 3');
            list.getSize().should.equal(3);
        });

    });

    describe('find functionality', function() {
        it('should find a node with the data provided', function() {
            populateList(list, 3);
            var node = list.findNode('test item 2');
            node.should.be.an.Object;
            node.getData().should.equal('test item 2');
        });

        it('should return -1 if a node does not exist with the given data', function() {
            populateList(list, 3);
            var node = list.findNode('not found...');
            node.should.not.be.an.Object;
            node.should.equal(-1);
        });

        it('should return -1 if findNode is called on an empty list', function() {
            var node = list.findNode('not found...');
            node.should.not.be.an.Object;
            node.should.equal(-1);
        });

        it('should return node at given index', function() {
            list.insert('test item 1');
            var node = list.findNodeAt(0);
            node.should.be.an.Object;
            node.getData().should.equal('test item 1');
        });

        it('should return -1 when findNodeAt is called with index > than list size', function() {
            var node = list.findNodeAt(0);
            node.should.not.be.an.Object;
            node.should.equal(-1);
        });

        it('should return the index of node with the given data', function() {
            populateList(list, 3);
            var index = list.indexOf('test item 1');
            index.should.equal(0);

            index = list.indexOf('test item 2');
            index.should.equal(1);

            index = list.indexOf('test item 3');
            index.should.equal(2);
        });

        it('should return -1 for the index of node with the given data if the node does not exist',
          function() {
            populateList(list, 3);
            var index = list.indexOf('not found');
            index.should.equal(-1);
        });

        it('should get the previous node of the node with the given data', function() {
            populateList(list, 3);
            var node = list.getNodeBefore('test item 3');
            node.should.be.an.Object;
            node.getData().should.equal('test item 2');
        });

        it('should return -1 when using getNodeBefore if a node does not exist with the given data', function() {
            populateList(list, 3);
            var node = list.getNodeBefore('not found...');
            node.should.not.be.an.Object;
            node.should.equal(-1);
        });

        it('should return -1 if getNodeBefore is called on an empty list', function() {
            var node = list.getNodeBefore('empty list...');
            node.should.not.be.an.Object;
            node.should.equal(-1);
        });

        it('should return -1 if getNodeBefore is called on a list with 1 node', function() {
            list.insert('test item 1');
            var node = list.getNodeBefore('test item 1');
            node.should.not.be.an.Object;
            node.should.equal(-1);
        });
    });
});
