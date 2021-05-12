import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-renegotiaton',
  templateUrl: './renegotiaton.component.html',
  styleUrls: ['./renegotiaton.component.scss']
})
export class RenegotiatonComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RenegotiatonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {price : string}) { }

  ngOnInit(): void {
  }

}
