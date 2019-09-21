/* globals describe it beforeEach before afterEach */
import LinkedList from '../index';

// Utility function to populate the list with dummy data.
// The number of nodes added will be specified by the 'numNodes'
// parameter.
const populateList = (aList: LinkedList, numNodes: number) => {
    for (let i = 0; i < numNodes; i++) {
        aList.insert('test item ' + (i + 1));
    }
};

describe('Linked List', () => {
    let list = null;
    beforeEach(() => {
        list = new LinkedList();
    });

    afterEach(() => {
        list = null;
    });

    it('the list exists', () => {
        expect(list).toBeTruthy();
    });

    it('initially contains zero items', () => {
        expect(list.isEmpty()).toBeTruthy();
        expect(list.getSize()).toEqual(0);
    });

    it('clears the list', () => {
        populateList(list, 10);
        expect(list.getSize()).toEqual(10);
        list.clear();
        expect(list.getSize()).toEqual(0);
    });

    it('returns an array of all the data in the list', () => {
        list.insert({
            id: 1,
            name: 'test item 1'
        });
        list.insert({
            id: 2,
            name: 'test item 2'
        });
        list.insert({
            id: 3,
            name: 'test item 3'
        });
        const listArray = list.toArray();
        expect(listArray).toHaveLength(3);
    });

    describe('iterator ', () => {
        it('exists when a list is instantiated', () => {
            expect(list.iterator).toBeTruthy();
        });

        it('currentNode is null when first instantiated', () => {
            expect(list.iterator.next()).toBeFalsy();
        });

        it('returns the head node when iterator.first() is called', () => {
            populateList(list, 10);
            const first = list.iterator.first();
            expect(first).toEqual(list.getHeadNode());
        });

        it('returns correct boolean value for hasNext()', () => {
            populateList(list, 3);
            list.iterator.reset();

            expect(list.iterator.hasNext()).toBeTruthy();
            // get first element
            list.iterator.next();

            expect(list.iterator.hasNext()).toBeTruthy();
            // get second element
            list.iterator.next();

            expect(list.iterator.hasNext()).toBeTruthy();
            // get third element
            list.iterator.next();

            // should be no more element in list
            expect(list.iterator.hasNext()).toBeFalsy();
        });
    });

    describe('insert', () => {
        it('sets the head node equal to the tail node when first item is inserted', () => {
            list.insert('test item 1');
            expect(list.getHeadNode()).toEqual(list.getTailNode());
            expect(list.getSize()).toEqual(1);
        });

        it('sets the head node equal to the tail node when first item is inserted', () => {
            list.insert('test item 1');
            expect(list.getHeadNode()).toEqual(list.getTailNode());
            expect(list.getSize()).toEqual(1);
        });

        it('inserts items to the back of the list', () => {
            populateList(list, 3);
            expect(list.isEmpty()).toBeFalsy();
            expect(list.getSize()).toEqual(3);
        });

        it('inserts items to the front of the list', () => {
            list.insert('test item 1');
            list.insertFirst('new item 1');
            expect(list.getHeadNode().data).toEqual('new item 1');
            expect(list.getSize()).toEqual(2);
        });

        it('inserts item at a particular index', () => {
            populateList(list, 3);
            list.insert('test item 5');
            expect(list.getSize()).toEqual(4);
            const success = list.insertAt(3, 'test item 4');
            expect(success).toBeTruthy();
            expect(list.getSize()).toEqual(5);
            const node = list.findAt(3);
            expect(node.getData()).toEqual('test item 4');
        });

        it('inserts new head node when inserting at index 0', () => {
            populateList(list, 3);
            expect(list.getSize()).toEqual(3);
            const success = list.insertAt(0, 'test item 0');
            expect(success).toBeTruthy();
            expect(list.getSize()).toEqual(4);
            const node = list.getHeadNode();
            expect(node.getData()).toEqual('test item 0');
        });

        it('returns false when trying to insert at index out of bounds', () => {
            populateList(list, 3);
            const success = list.insertAt(5, 'test item 4');
            expect(success).toBeFalsy();
        });

        it('inserts item before a particular node', () => {
            populateList(list, 3);
            list.insert('test item 5');
            expect(list.getSize()).toEqual(4);

            list.insertBefore('test item 5', 'test item 4');
            expect(list.getSize()).toEqual(5);
            let node = list.findAt(3);
            expect(node.getData()).toEqual('test item 4');

            // test for inserting before the head node
            list.insertBefore('test item 1', 'test item 0');
            expect(list.getSize()).toEqual(6);
            node = list.getHeadNode();
            expect(node.getData()).toEqual('test item 0');
        });

        it('inserts item after a particular node', () => {
            populateList(list, 3);
            list.insert('test item 5');
            expect(list.getSize()).toEqual(4);

            list.insertAfter('test item 3', 'test item 4');
            expect(list.getSize()).toEqual(5);
            let node = list.findAt(3);
            expect(node.getData()).toEqual('test item 4');

            // test for inserting after the tail node
            list.insertAfter('test item 5', 'test item 6');
            expect(list.getSize()).toEqual(6);
            node = list.getTailNode();
            expect(node.getData()).toEqual('test item 6');
        });
    });

    describe('remove', () => {
        it('returns null if remove is called on an empty list', () => {
            const node = list.remove();
            expect(node).toBeFalsy();
        });
    });

    describe('pre-initialized list', () => {
        let populatedList: LinkedList = null;

        // Utility function to populate the list with dummy data.
        // The number of nodes added will be specified by the 'numNodes'
        // parameter.
        const populateArray = (arr: any[], numItems: number) => {
            for (var i = 0; i < numItems; i++) {
                arr.push('test item ' + (i + 1));
            }
        };

        beforeEach(() => {
            var arr: any[] = [];
            populateArray(arr, 5);
            populatedList = new LinkedList(arr);
        });

        afterEach(() => {
            populatedList = null;
        });

        it('initially contains five items', () => {
            expect(populatedList.isEmpty()).toBeFalsy();
            expect(populatedList.getSize()).toEqual(5);
        });
    });
});

// describe('Linked List', function() {

//     describe('remove functionality', function() {
//         it('returns null if remove is called on an empty list', function() {
//             var node = list.remove();
//             expect(node).to.not.exist;
//         });

//         it('removes items from the back of the list', function() {
//             populateList(list, 3);
//             expect(list.isEmpty()).to.be.false;
//             expect(list.getSize()).to.equal(3);
//             var node = list.remove();
//             expect(node.data).to.equal('test item 3');
//             expect(list.getTailNode().getData()).to.equal('test item 2');
//             expect(list.getSize()).to.equal(2);
//         });

//         it('returns null if removeFirst is called on an empty list', function() {
//             var node = list.removeFirst();
//             expect(node).to.not.exist;
//         });

//         it('removes items from the front of the list', function() {
//             populateList(list, 3);
//             expect(list.isEmpty()).to.be.false;
//             expect(list.getSize()).to.equal(3);
//             var node = list.removeFirst();
//             expect(node.getData()).to.equal('test item 1');
//             expect(list.getHeadNode().getData()).to.equal('test item 2');
//             expect(list.getSize()).to.equal(2);
//         });

//         it('removes item from the front of a list with only one node', function() {
//             list.insert('test item 1');
//             var node = list.removeFirst();
//             expect(node.getData()).to.equal('test item 1');
//             expect(list.getSize()).to.equal(0);
//         });

//         it('removes item at a particulary index', function() {
//             populateList(list, 4);
//             expect(list.getSize()).to.equal(4);
//             var node = list.removeAt(1);
//             expect(node.getData()).to.equal('test item 2');
//             expect(list.getSize()).to.equal(3);
//         });

//         it('removes a node with given data', function() {
//             populateList(list, 4);
//             expect(list.getSize()).to.equal(4);
//             var node = list.removeNode('test item 3');
//             expect(node.getData()).to.equal('test item 3');
//             expect(list.getSize()).to.equal(3);
//         });
//     });

//     describe('find functionality', function() {
//         it('finds a node with the data provided', function() {
//             populateList(list, 3);
//             var node = list.find('test item 2');
//             expect(node).to.be.an('Object');
//             expect(node.getData()).to.equal('test item 2');
//         });

//         it('finds a node with a complex obj', function() {
//             list.insert({ key: 'key', value: 'value123' });
//             var node = list.find({ key: 'key', value: 'value123' });
//             expect(node.getData()).to.be.an('Object');
//             expect(node.getData()).to.have.property('key');
//             expect(node.getData()).to.have.property('value');
//         });

//         it('returns -1 if a node does not exist with the given data', function() {
//             populateList(list, 3);
//             var node = list.find('not found...');
//             expect(node).to.not.be.an('Object');
//             expect(node).to.equal(-1);
//         });

//         it('returns -1 if find() is called on an empty list', function() {
//             var node = list.find('not found...');
//             expect(node).to.not.be.an('Object');
//             expect(node).to.equal(-1);
//         });

//         it('returns node at given index', function() {
//             list.insert('test item 1');
//             var node = list.findAt(0);
//             expect(node).to.be.an('Object');
//             expect(node.getData()).to.equal('test item 1');
//         });

//         it('returns -1 when findAt() is called with index > than list size', function() {
//             var node = list.findAt(0);
//             expect(node).to.not.be.an('Object');
//             expect(node).to.equal(-1);
//         });

//         it('returns the index of node with the given data', function() {
//             populateList(list, 3);
//             var index = list.indexOf('test item 1');
//             expect(index).to.equal(0);

//             index = list.indexOf('test item 2');
//             expect(index).to.equal(1);

//             index = list.indexOf('test item 3');
//             expect(index).to.equal(2);
//         });

//         it('returns -1 for the index of node with the given data if the node does not exist', function() {
//             populateList(list, 3);
//             var index = list.indexOf('not found');
//             expect(index).to.equal(-1);
//         });

//         it('returns true if list contains specified data, false otherwise', function() {
//             populateList(list, 3);
//             var result = list.contains('test item 2');
//             expect(result).to.be.true;

//             result = list.contains('not found');
//             expect(result).to.be.false;
//         });
//     });

//     describe('Pre initialized Linked List', function() {
//         var list;

//         // Utility function to populate the list with dummy data.
//         // The number of nodes added will be specified by the 'numNodes'
//         // parameter.
//         var populateArray = function(arr, numItems) {
//             for (var i = 0; i < numItems; i++) {
//                 arr.push('test item ' + (i + 1));
//             }
//         };

//         beforeEach(function() {
//             var arr = [];
//             populateArray(arr, 5);
//             list = new LinkedList(arr);
//         });

//         afterEach(function() {
//             list = null;
//         });

//         it('initially contains five items', function() {
//             expect(list.isEmpty()).to.be.false;
//             expect(list.getSize()).to.equal(5);
//         });
//     });
// });
