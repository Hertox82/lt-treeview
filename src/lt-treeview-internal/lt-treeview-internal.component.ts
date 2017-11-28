import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Input() callBackOnUpdate: any;

  @Input() callBackOnDelete: any;

  @Output() onUpdate = new EventEmitter<ParentChild>();

  @Output() onDelete = new EventEmitter<ParentChild>();

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
    if (this.show === true) {
      if (confirm('Do you really want delete this Node?')) {
        const index = this.data.indexOf(item);
        if (index > -1) {
          this.data.splice(index, 1);
          const emitNode = {
            node : item
          } as ParentChild;
          this.onDelete.emit(emitNode);
        }
      }
    }
  }

  addNode(item: NodeAdded) {
    let emitNode = {};
    let storedNode = {}; 
    this.data.forEach((node) => {
        if (node === this.currentNode) {
          const itemNode = convertAddedToNode(item);
          emitNode = {
            parent: node,
            node: itemNode
          } as ParentChild;
          if (this.callBackOnUpdate == undefined) {
            node.children.push(convertAddedToNode(item));
          } else {
            this.onUpdate.emit(emitNode as ParentChild);
          }
          node.adding = false;
        }
    });
    this.currentNode = undefined;
  }

}
