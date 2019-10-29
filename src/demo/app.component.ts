import { Component } from '@angular/core';
import {Node, NodeAdded, ParentChild} from '../lt-treeview';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  lista: Node[];
  addedList: NodeAdded[];

  self = this;
  constructor() {
    this.lista = [{
      label: 'Padre',
      children: [],
      obj: {id: 1},
      expand: false,
      adding: false,
    },
    {
      label: 'Padre',
      obj: {id: 2},
      expand: false,
      adding: false,
      children : [
        {
          label: 'figlio',
          obj: {id: 3},
          children: [],
          expand: false,
          adding: false,
        },
        {
          label: 'figlio',
          children: [],
          obj: {id: 4},
          expand: false,
          adding: false,
        }
      ]
    }
    ];

    this.addedList = [
      {
        label: 'Madre',
      },
      {
        label: 'Padre',
      },
      {
        label: 'figlio'
      },
      {
        label: 'sorella'
      }
    ];
  }

  change(event) {
    console.log(this.lista);
  }

  public updateData(data: any): Promise<Node> {
      // in this case is Added parent Root
      return new Promise<Node>((resolve, recject) => {
        setTimeout(() => {
          data.node.obj = {id: lastIdInsert(this.lista)};
          resolve(data.node);
        }, 10);
      });
  }

  deleteData(data: any) {
    console.log(data);
  }
}


export function lastIdInsert(lista: Node[]): number {
  let id = 0;

  lista.forEach(
    (item) => {
      if (item.obj.id > id) {
        id = item.obj.id;
      }
      id = lastInsertIdRec(item.children, id);
    }
  );

  return id + 1;
}

function lastInsertIdRec(data: Node[], id: number): number {
data.forEach(
  (item) => {
    if (item.obj.id > id) {
      id = item.obj.id;
    }
    id = lastInsertIdRec(item.children, id);
  }
);
return id;
}
