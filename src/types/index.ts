export type ListNode = {
    data: any;
    next: ListNode | null;
    hasNext(): boolean;
    getData(): any;
    toString(): string;
};

export type ListIterator = {
    list: LinkedList;
    currentNode: ListNode;
    next: () => ListNode;
    hasNext: () => boolean;
    reset: () => void;
    first: () => ListNode;
    setList: (list: LinkedList) => void;
    each: (cb: (node: ListNode) => void) => void;
};

export type LinkedList = {
    head: ListNode;
    tail: ListNode;
    size: number;
    iterator: ListIterator;
    getHeadNode(): ListNode;
};
