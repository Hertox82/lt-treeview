import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Node, NodeAdded, convertAddedToNode, ParentChild } from './node';

@Component({
  selector: 'lt-treeview',
  templateUrl: './lt-treeview.component.html',
  styleUrls: ['./lt-treeview.component.css']
})
export class LtTreeviewComponent implements OnInit {

  @Input() data: Node[] = [];

  @Input() listToAdd: NodeAdded[] = [];

  @Input() show: boolean;

  @Input() callBackOnUpdate: Function;

  @Input() callBackOnDelete: Function;

  currentNode: Node;
  addRootb: boolean;

  constructor() {
    this.addRootb = false;
  }

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

  addRoot() {
    this.addRootb = !this.addRootb;
  }

  addRootNode(item: NodeAdded) {
    // Converting the NodeAdded into Node
    const node: Node = convertAddedToNode(item);
    const emitNode = {
      node: node
    } as ParentChild;
    if ( this.callBackOnUpdate != undefined) {
     this.callBackOnUpdate(this.data, emitNode)
      .then((res) => {
        this.data.push(res);
      });
    }else {
      this.data.push(node);
    }
    // pushing node into dataNode
    this.addRootb = !this.addRootb;
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
            this.callBackOnDelete(emitNode);
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
