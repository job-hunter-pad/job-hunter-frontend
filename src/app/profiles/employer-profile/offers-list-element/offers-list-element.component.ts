import { Component, Input, OnInit, Output } from '@angular/core';
import { JobsService } from 'src/app/jobs/jobs.service';
import { EventEmitter } from '@angular/core';
import { JobApplication } from 'src/app/jobs/jobApplication';
import { JobOffer } from 'src/app/jobs/jobOffer';

@Component({
  selector: 'app-offers-list-element',
  templateUrl: './offers-list-element.component.html',
  styleUrls: ['./offers-list-element.component.scss']
})
export class OffersListElementComponent implements OnInit {

  private _job: JobOffer;

  isApplicationComplete = false;

  @Input() set job(value: JobOffer) {

    this._job = value;
    for (let i = 0; i < this._job.applications.length; i++) {
      const element = this._job.applications[i];
      if (element.status == 'ACCEPTED' || element.status == 'COMPLETED') {
        this.acceptedApplication = element;
        if (element.status == 'COMPLETED') {
          this.isApplicationComplete = true;
        }
        break;
      }
    }
  }

  get job(): JobOffer {

    return this._job;

  }

  @Output() applicationHandleEvent: EventEmitter<any> = new EventEmitter();

  value: number;
  acceptedApplication: JobApplication;

  constructor(private jobService: JobsService) { }

  ngOnInit(): void {
  }

  isStatusPending() {
    if (this.job.status == 'PENDING') {
      return true;
    }
    return false;
  }

  isStatusInProgress() {
    if (this.job.status == 'IN_PROGRESS') {
      return true;
    }
    return false;
  }

  onAcceptApplicationButtonClick(applicationId) {
    this.jobService.acceptApplication(this.job.id, applicationId).subscribe(application => {
      this.applicationHandleEvent.emit()
    });
  }

  onRejectApplicationButtonClick(applicationId) {
    this.jobService.rejectApplication(this.job.id, applicationId).subscribe(application => { this.applicationHandleEvent.emit() });
  }

  completeJobOffer() {

  }
}
