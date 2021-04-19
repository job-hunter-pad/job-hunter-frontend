import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-array',
  templateUrl: './review-array.component.html',
  styleUrls: ['./review-array.component.scss']
})
export class ReviewArrayComponent implements OnInit {

  @Input() reviews;

  constructor() { }

  ngOnInit(): void {
  }

}
