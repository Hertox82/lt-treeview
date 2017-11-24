import { Component } from '@angular/core';
import {Node, NodeAdded} from './modules/lt-treeview';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  lista: Node[];
  addedList: NodeAdded[];
  constructor() {
    this.lista = [{
      label: 'Padre',
      children: [],
      expand: false,
      adding: false,
    },
    {
      label: 'Padre',
      expand: false,
      adding: false,
      children : [
        {
          label: 'figlio',
          children: [],
          expand: false,
          adding: false,
        },
        {
          label: 'figlio',
          children: [],
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
}
