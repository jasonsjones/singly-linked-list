export interface IListNode {
    data: any;
    next: IListNode | null;
    hasNext(): boolean;
    getData(): any;
    toString(): string;
}

export interface IListIterator {
    list: ILinkedList;
    currentNode: IListNode;
    next: () => IListNode;
    hasNext: () => boolean;
    reset: () => void;
    first: () => IListNode;
    setList: (list: ILinkedList) => void;
    each: (cb: (node: IListNode) => void) => void;
}

export interface ILinkedList {
    head: IListNode;
    tail: IListNode;
    size: number;
    iterator: IListIterator;
    createNewNode: (data: any) => IListNode;
    getHeadNode(): IListNode;
    getTailNode(): IListNode;
}
