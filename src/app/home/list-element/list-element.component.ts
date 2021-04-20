import { Component, Input, OnInit } from '@angular/core';
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

  @Input()
  jobValue;

}
