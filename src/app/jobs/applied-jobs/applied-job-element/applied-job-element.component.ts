import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-applied-job-element',
  templateUrl: './applied-job-element.component.html',
  styleUrls: ['./applied-job-element.component.scss']
})
export class AppliedJobElementComponent implements OnInit {

  @Input() application;
  @Input() job;

  @Output() onJobCompleted: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  completeJobOffer() {
    this.onJobCompleted.emit(this.job);
  }
}
