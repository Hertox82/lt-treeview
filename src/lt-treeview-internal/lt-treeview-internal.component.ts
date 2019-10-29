import { Component, OnInit, Input } from '@angular/core';
import { Node, NodeAdded, convertAddedToNode, ParentChild } from '../lt-treeview/node';

@Component({
  selector: 'lt-treeview-internal',
  templateUrl: './lt-treeview-internal.component.html',
  styleUrls: ['./lt-treeview-internal.component.css']
})
export class LtTreeviewInternalComponent implements OnInit {

  @Input() data: Node[];
  @Input() listToAdd: NodeAdded[] = [];
  @Input() show: boolean;
  @Input() parent = <Node>null;

  @Input() callBackOnUpdate: any;

  @Input() callBackOnDelete: any;

  @Input() component: any;

  currentNode: Node;

  constructor() { }

  ngOnInit() {
  }
  expand(item: Node) {
    if (item.children.length > 0) {
      item.expand = !item.expand;
    }
  }

  add(item: Node) {
    if (this.show === true) {
      if (this.currentNode == undefined) {
        this.currentNode = item;
        this.currentNode.adding = true;
      } else if (this.currentNode === item) {
        this.currentNode = undefined;
        item.adding = false;
      } else if (this.currentNode !== item) {
        this.currentNode = item;
        this.currentNode.adding = true;
      }
    }
  }

  delete(item: Node) {
    if (this.show === true) {
      if (confirm('Do you really want delete this Node?')) {
        const index = this.data.indexOf(item);
        if (index > -1) {
          this.data.splice(index, 1);
          const emitNode = {
            node : item
          } as ParentChild;
          if (this.callBackOnDelete != undefined) {
            if (this.component == undefined) {
              this.callBackOnDelete(emitNode);
            } else {
                if (this.callBackOnDelete && typeof this.callBackOnDelete == 'function') {
                  const method = this.callBackOnDelete.bind(this.component);
                  method(emitNode);
                } else {
                  this.component[this.callBackOnDelete](emitNode);
                }
            }
          }
        }
      }
    }
  }

  addNode(item: NodeAdded) {
    this.data.forEach((node) => {
        if (node === this.currentNode) {
          const convertedNode = convertAddedToNode(item);
          if (this.callBackOnUpdate == undefined) {
            node.children.push(convertedNode);
            node.expand = true;
          } else {
            const emitNode = {
              parent: node,
              node: convertedNode
            } as ParentChild;
            if (this.component == undefined) {
              this.callBackOnUpdate(emitNode).then(
                (res) => {
                  node.children.push(res);
                  node.expand = true;
                }
              );
            } else {
                if (typeof this.callBackOnUpdate == 'function') {
                  const method = this.callBackOnUpdate.bind(this.component);

                  method(emitNode).then(
                    (res) => {
                      node.children.push(res);
                      node.expand = true;
                    }
                  );
                } else {
                  this.component[this.callBackOnUpdate](node.children, emitNode).then(
                    (res) => {
                      node.children.push(res);
                      node.expand = true;
                    }
                  );
                }
            }
          }
          node.adding = false;
        }
    });
    this.currentNode = undefined;
  }

}
