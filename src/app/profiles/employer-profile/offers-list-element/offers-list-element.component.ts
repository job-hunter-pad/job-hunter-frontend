import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers-list-element',
  templateUrl: './offers-list-element.component.html',
  styleUrls: ['./offers-list-element.component.scss']
})
export class OffersListElementComponent implements OnInit {

  @Input() job;

  constructor() { }

  ngOnInit(): void {
  }

  isStatusPending() {
    if (this.job.status == 'PENDING') {
      return true;
    }
    return false;
  }
}
