import { Component, OnInit } from '@angular/core';
import {HomeComponent} from '../home.component'
import {Job} from '../../job'

@Component({
  selector: 'app-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.scss']
})
export class ListElementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
   
  job: Job  = {
    job_name : 'Title',
    employer_name: 'Employer Name',
    job_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: new Date('2021-04-18').toLocaleDateString()
  }
}
