import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {ListElementComponent} from './list-element/list-element.component'
import {JOBS} from '../mock-jobs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  jobs = JOBS
}
