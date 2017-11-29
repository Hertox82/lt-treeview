import { Component, OnInit, Input, Output } from '@angular/core';
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

  @Input() callBackOnUpdate: Function;

  @Input() callBackOnDelete: Function;

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
      }else if (this.currentNode === item) {
        this.currentNode = undefined;
        item.adding = false;
      }else if (this.currentNode !== item) {
        this.currentNode = item;
        this.currentNode.adding = true;
      }
    }
  }

  delete(item: Node) {
      if (confirm('Do you really want delete this Node?')) {
        const index = this.data.indexOf(item);
        if (index > -1) {
          this.data.splice(index, 1);
          const emitNode = {
            node : item
          } as ParentChild;
          if ( this.callBackOnDelete != undefined) {
            this.callBackOnDelete(emitNode);
          }
          if (this.parent.children.length === 0) {
            this.parent.expand = false;
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
          this.callBackOnUpdate(node.children, emitNode).then(
            (res) => {
              node.children.push(res);
              node.expand = true;
            }
          );
        }
        node.adding = false;
      }
  });
  this.currentNode = undefined;
  }

}
