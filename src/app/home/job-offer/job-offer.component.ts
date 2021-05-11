import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobOffer } from 'src/app/jobs/jobOffer';
import { RenegotiatonComponent } from './renegotiaton/renegotiaton.component'
import { HomeService } from '../home.service'

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent implements OnInit {

  applicants = [
    { name: 'Mihai' },
    { name: 'Gheorghe' },
    { name: 'Amalia' },
    { name: 'Stefania' }
  ];

  applyForm: FormGroup;
  error = false;
  errorMessage;

  constructor(
    public dialogRef: MatDialogRef<JobOfferComponent>,

    @Inject(MAT_DIALOG_DATA) public data: JobOffer,
    public dialog: MatDialog, private formBuilder: FormBuilder,
    private homeService: HomeService,) { }

  ngOnInit(): void {
    this.applyForm = this.formBuilder.group({
      myPrice: [this.data.hourSalaryAmount],
      hours: ['', [Validators.required]],
    })
  };


  openRenegotiation() {
    if (this.applyForm.valid) {
      this.homeService.apply(this.applyForm.get('hours').value, this.applyForm.get('price').value).subscribe(
        (res: any) => {
          if (res.success) {
            this.dialog.open(RenegotiatonComponent, {
              width: '500px',
              height: '100px',
              data: null
            });
          }
          else {
            this.errorMessage = res.fail_message;
            this.error = true;
          }
        }
      );
    }
  }
}
