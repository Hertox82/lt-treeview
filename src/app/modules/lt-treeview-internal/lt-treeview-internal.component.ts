import { Component, OnInit, Input } from '@angular/core';
import { Node, NodeAdded, convertAddedToNode } from '../lt-treeview/node';

@Component({
  selector: 'lt-treeview-internal',
  templateUrl: './lt-treeview-internal.component.html',
  styleUrls: ['./lt-treeview-internal.component.css']
})
export class LtTreeviewInternalComponent implements OnInit {

  @Input() data: Node[];
  @Input() listToAdd: NodeAdded[] = [];
  @Input() show: boolean;

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
        }
      }
    }
  }

  addNode(item: NodeAdded) {
    this.data.forEach((node) => {
        if (node === this.currentNode) {
          node.children.push(convertAddedToNode(item));
          node.adding = false;
        }
    });
    this.currentNode = undefined;
  }

}
