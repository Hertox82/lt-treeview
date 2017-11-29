# lt-treeview

[![npm version](https://badge.fury.io/js/lt-treeview.svg)](https://badge.fury.io/js/lt-treeview)
[![NPM](https://nodei.co/npm/lt-treeview.png)](https://www.npmjs.com/package/lt-treeview)

It's a Angular 4 Treeview Component, very easy to use

## Install

In order to install this library type this command on your terminal

```shell
npm install lt-treeview --save
```

## Setup

import the `LtTreeviewModule` into your module

```typescript

@NgModule({
  declarations : [
    AppModule,
    ...
  ],
  import : [
    LtTreeviewModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}

```

after this, you can be able to load the LtTreeviewComponent into your own Component like this

```typescript
@Component({
  selector : 'app-your-component',
  template : '<lt-treeview [data] = "listOfElementToShow" [listToAdd]="addedList" [show]="false" [component]="self" [callBackOnUpdate]="UpdateItem" [callBackOnDelete]="DeleteItem"></lt-treeview>',
  styles : ['']
})

```
`data` is an array of Element you want to show into the treeview.

`listToAdd` is an array of data that you want to add to your treeview

`show` is a boolean that if is false you cannot add/erase data into the treeview.

`callBackOnUpdate` is function with you can pass a Promise<Node>, if you pass a component you can also type a name of function with string

`callBackOnDelete` is function for callback when item is deleted, if you pass a component you can also type a name of function with string

`component` you can pass the itself in order to bind it into the callback and read the property inside the function 

## Example

Into the library you can find a little app that emulate the beahaviour of Treeview.


## Example callBackOnUpdate

```typescript

/**
 *Inside the Component
 */

let self = this;

updateData(data: any): Promise<Node> {
      return new Promise<Node>((resolve, recject) => {
        setTimeout(() => {
          data.node.obj = {id: lastIdInsert(this.arrayList)};
          resolve(data.node);
        }, 10);
      });
  }

```

Enjoy it

[hertox82](https://www.linkedin.com/in/hernan-ariel-de-luca-23842254/)




