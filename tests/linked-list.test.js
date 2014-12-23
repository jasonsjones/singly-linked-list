/* globals describe it beforeEach afterEach */

var should = require('should');
var LinkedList = require('../linked-list');

describe('Linked List', function() {
    var list = null;

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

    describe('insert functionality', function() {
        it('should set the head node equal to the tail node when first item is inserted', function() {
            list.insert('test item 1');
            list.getHeadNode().should.equal(list.getTailNode());
            list.getSize().should.equal(1);
        });

        it('should insert items to the back of the list', function() {
            list.insert('test item 1');
            list.insert('test item 2');
            list.insert('test item 3');
            list.isEmpty().should.equal(false);
            list.getSize().should.equal(3);
        });

        it('should insert items to the front of the list', function() {
            list.insert('test item 1');
            list.insertFirst('new item 1');
            list.getHeadNode().data.should.equal('new item 1');
            list.getSize().should.equal(2);
        });

    });

    describe('remove functionality', function() {
        it('should return null if remove is called on an empty list', function() {
            var node = list.remove();
            should.not.exist(node);
        });

        it('should remove items from the back of the list', function() {
            list.insert('test item 1');
            list.insert('test item 2');
            list.insert('test item 3');
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
            list.insert('test item 1');
            list.insert('test item 2');
            list.insert('test item 3');
            list.isEmpty().should.equal(false);
            list.getSize().should.equal(3);
            var node = list.removeFirst();
            node.getData().should.equal('test item 1');
            list.getHeadNode().getData().should.equal('test item 2');
            list.getSize().should.equal(2);
        });

    });

    describe('find/get functionality', function() {
        it('should find a node with the data provided', function() {
            list.insert('test item 1');
            list.insert('test item 2');
            list.insert('test item 3');
            var node = list.findNode('test item 2');
            node.should.be.an.Object;
            node.getData().should.equal('test item 2');
        });

        it('should return -1 if a node does not exist with the given data', function() {
            list.insert('test item 1');
            list.insert('test item 2');
            list.insert('test item 3');
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
            var node = list.findNodeAtIndex(0);
            node.should.be.an.Object;
            node.getData().should.equal('test item 1');
        });

        it('should return -1 when findNodeAtIndex is called with index > than list size', function() {
            var node = list.findNodeAtIndex(0);
            node.should.not.be.an.Object;
            node.should.equal(-1);
        });

        it('should get the previous node of the node with the given data', function() {
            list.insert('test item 1');
            list.insert('test item 2');
            list.insert('test item 3');
            var node = list.getNodeBefore('test item 3');
            node.should.be.an.Object;
            node.getData().should.equal('test item 2');
        });

        it('should return -1 when using getNodeBefore if a node does not exist with the given data', function() {
            list.insert('test item 1');
            list.insert('test item 2');
            list.insert('test item 3');
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

    it('should return a string representation of the data if the node data type is an object', function() {
        list.insert({
            "id": 1,
            "name": "test obj 1"
        });
        list.getHeadNode().toString().should.equal('{"id":1,"name":"test obj 1"}');
    });
});
