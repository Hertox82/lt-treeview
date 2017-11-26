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
  template : '<lt-treeview [data] = "listOfElementToShow" [listToAdd]="addedList" [show]="false"></lt-treeview>',
  styles : ['']
})

```
`data` is an array of Element you want to show into the treeview.

`listToAdd` is an array of data that you want to add to your treeview

`show` is a boolean that if is false you cannot add/erase data into the treeview.

## Example

Into the library you can find a little app that emulate the beahaviour of Treeview.


Enjoy it

[hertox82](https://www.linkedin.com/in/hernan-ariel-de-luca-23842254/)




