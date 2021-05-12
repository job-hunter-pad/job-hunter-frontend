import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-past-jobs',
  templateUrl: './past-jobs.component.html',
  styleUrls: ['./past-jobs.component.scss']
})
export class PastJobsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  jobValue;
}
