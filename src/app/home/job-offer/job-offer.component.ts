import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Job} from '../../job'
import {RenegotiatonComponent} from './renegotiaton/renegotiaton.component'

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent implements OnInit {

  applicants;

  constructor(
    public dialogRef: MatDialogRef<JobOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Job,
    public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openRenegotiation(): void {
    this.dialog.open(RenegotiatonComponent,{
      width: '400px',
      height: '400px',
      data: null
    });
  }
}
