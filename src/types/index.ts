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

    // Utility methods
    createNewNode(data: any): IListNode;
    getHeadNode(): IListNode;
    getTailNode(): IListNode;
    isEmpty(): boolean;
    getSize(): number;
    clear(): void;
    forEach(cb: (node: IListNode) => void): void;
    toArray(): IListNode[];
    printList(): void;

    // Insert methods
    insert(data: any): boolean;
    insertFirst(data: any): boolean;
    insertAt(index: number, data: any): boolean;
    insertBefore(nodeData: any, dataToInsert: any): boolean;
    insertAfter(nodeData: any, dataToInsert: any): boolean;

    // Remove methods
    remove(): IListNode;
    removeFirst(): IListNode;
    removeAt(index: number): IListNode;
    removeNode(data: any): IListNode;

    // Find methods
    indexOf(data: any): number;
    contains(data: any): boolean;
    find(data: any): IListNode;
    findAt(index: number): IListNode;
}
