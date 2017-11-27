import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LtTreeviewModule} from '../lt-treeview';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LtTreeviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

