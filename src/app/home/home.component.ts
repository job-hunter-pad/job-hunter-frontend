import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs/jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jobs = [];
  displayedJobs;
  searchText;
  
  constructor(private jobService: JobsService) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(jobArray => {
      this.jobs = jobArray; 
      this.displayedJobs = jobArray;
      this.showJobs({ pageIndex: 0, pageSize: 10 });
    })
  }

  showJobs(event) {
    console.log(event);
    var start = event.pageIndex*event.pageSize;
    var end = start + event.pageSize;
    this.displayedJobs = this.jobs.slice(start , end)
  }

  
}
