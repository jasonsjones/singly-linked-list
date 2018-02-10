/* globals describe it beforeEach before afterEach */

var chai = require('chai');
var Node = require('../lib/list-node');

var expect = chai.expect;

describe('List Node', function () {

    it('exists when instantiated', function () {
        var node = new Node('test data');
        expect(node).to.exist;
    });

    it('returns the correct (primitive) data', function () {
        var node = new Node('test data');
        var data = node.getData();
        expect(data).to.be.a('String');
        expect(data).to.equal('test data');

        node.data = 42;
        data = node.getData();
        expect(data).to.be.a('Number');
        expect(data).to.equal(42);

    });

    it('returns the correct (object) data', function () {
        var node = new Node({
            name: 'test item',
            number: 1
        });
        var data = node.getData();
        expect(data).to.be.an('Object');
        expect(node.toString()).to.equal('{"name":"test item","number":1}');
    });

    it('returns whether or not it has a next node', function () {
        var firstNode = new Node('first node');
        var secondNode = new Node('second node');
        firstNode.next = secondNode;
        expect(firstNode.hasNext()).to.be.true;
    });

    it('returns a proper string representation of its data', function () {
        var node = new Node({name: 'test item', number: 1});
        expect(node.toString()).to.equal('{"name":"test item","number":1}');

        node.data = 'string data';
        expect(node.toString()).to.equal('string data');

        node.data = 42;
        expect(node.toString()).to.equal('42');
    });
});
