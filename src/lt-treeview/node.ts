

export interface Node {
    label: string;
    obj?: any;
    children: Node[];
    expand: boolean;
    adding: boolean;
}


export interface NodeAdded {
    label: string;
    obj?: any;
}


export function convertAddedToNode(item: NodeAdded): Node {
 return {
    label: item.label,
    obj: item.obj,
    children: [],
    expand: false,
    adding: false,
 } as Node;
}

export interface ParentChild {
    parent?: Node;
    node: Node;
}
