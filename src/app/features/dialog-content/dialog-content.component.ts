import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  standalone: false
})
export class DialogContentComponent {
  constructor(public dialogRef: MatDialogRef<DialogContentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    console.log('DialogContentComponent', data);
  }
}
