export interface IListNode {
    data: any;
    next: IListNode | null;
    hasNext(): boolean;
    getData(): any;
    toString(): string;
}
