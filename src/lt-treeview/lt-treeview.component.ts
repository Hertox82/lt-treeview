import { Component, OnInit, Input } from '@angular/core';
import { Node, NodeAdded, convertAddedToNode, ParentChild } from './node';

@Component({
  selector: 'lt-treeview',
  templateUrl: './lt-treeview.component.html',
  styleUrls: ['./lt-treeview.component.css']
})
export class LtTreeviewComponent implements OnInit {

  @Input() data: Node[] = [];

  @Input() listToAdd: NodeAdded[] = [];

  @Input() show = false;

  @Input() callBackOnUpdate: any;

  @Input() callBackOnDelete: any;

  @Input() component: any;

  currentNode: Node | undefined;
  addRootb: boolean;

  constructor() {
    this.addRootb = false;
  }

  ngOnInit(): void {
  }

  /**
   * This function collapse the item in treeview
   * @param item
   */
  expand(item: Node): void {
    if (item.children.length > 0) {
      item.expand = !item.expand;
    }
  }
/**
 * This function call The AddNode function
 * @param item
 */
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
        if (this.component == undefined) {
        this.callBackOnUpdate(this.data, emitNode)
          .then((res: any) => {
            this.data.push(res);
          });
      } else {
        if (this.callBackOnUpdate && typeof this.callBackOnUpdate == 'function') {
            const method = this.callBackOnUpdate.bind(this.component);
            method(emitNode).then(
              (res: any) => {
                this.data.push(res);
              }
            );
        } else {
        this.component[this.callBackOnUpdate](emitNode).then(
            (res: any) => {
              this.data.push(res);
            }
          );
        }
      }
    }else {
      this.data.push(node);
    }
    // pushing node into dataNode
    this.addRootb = !this.addRootb;
  }

  delete(item: Node): void {
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

  addNode(item: NodeAdded): void {
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
                (res: any) => {
                  node.children.push(res);
                  node.expand = true;
                }
              );
            } else {
                if (typeof this.callBackOnUpdate == 'function') {
                  const method = this.callBackOnUpdate.bind(this.component);

                  method(emitNode).then(
                    (res: any) => {
                      node.children.push(res);
                      node.expand = true;
                    }
                  );
                } else {
                  this.component[this.callBackOnUpdate](node.children, emitNode).then(
                    (res: any) => {
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
