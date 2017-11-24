import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LtTreeviewComponent } from './lt-treeview.component';
import { LtTreeviewInternalComponent} from '../lt-treeview-internal';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LtTreeviewComponent, LtTreeviewInternalComponent],
  exports: [LtTreeviewComponent]
})
export class LtTreeviewModule { }
