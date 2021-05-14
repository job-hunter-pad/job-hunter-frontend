import { Component, Input, OnInit } from '@angular/core';
import { JobOfferComponent } from '../job-offer/job-offer.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.scss']
})
export class ListElementComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  @Input()
  jobValue;

  openDialog(): void {
    this.dialog.open(JobOfferComponent, {
      width: '800px',
      // height: '500px',
      data: this.jobValue,
      autoFocus: false
    });
  }
}
