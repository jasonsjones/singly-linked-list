import ListNode from '../lib/list-node';

describe('List Node', () => {
    [null, undefined, '', 'test data', 42].forEach(data => {
        it(`exists when instantiated with ${data}`, () => {
            const node = new ListNode(data);
            expect(node).toBeTruthy();
        });
    });

    [
        {
            data: 'test data',
            type: 'string'
        },
        {
            data: 42,
            type: 'number'
        },
        {
            data: null,
            type: 'object'
        }
    ].forEach(testInput => {
        it(`returns the correct (${testInput.type}) data for ${testInput.data}`, () => {
            let node = new ListNode(testInput.data);
            let data = node.getData();
            expect(typeof data).toEqual(testInput.type);
            expect(data).toEqual(testInput.data);
        });
    });

    it('returns the correct (object) data', () => {
        const node = new ListNode({
            name: 'test item',
            number: 1
        });
        const data = node.getData();
        expect(typeof data).toEqual('object');
        expect(node.toString()).toEqual('{"name":"test item","number":1}');
    });

    it('returns true if node has a next node', () => {
        const firstNode = new ListNode('first node');
        const secondNode = new ListNode('second node');
        firstNode.next = secondNode;
        expect(firstNode.hasNext()).toBeTruthy();
    });

    it('returns false if node does NOT have a next node', () => {
        const firstNode = new ListNode('first node');
        expect(firstNode.hasNext()).toBeFalsy();
    });

    [
        {
            data: { name: 'test item', number: 1 },
            expected: '{"name":"test item","number":1}'
        },
        {
            data: 'string data',
            expected: 'string data'
        },
        {
            data: 42,
            expected: '42'
        }
    ].forEach(testInput => {
        it(`returns a proper string representation for ${JSON.stringify(testInput.data)}`, () => {
            const node = new ListNode(testInput.data);
            expect(node.toString()).toEqual(testInput.expected);
        });
    });
});
