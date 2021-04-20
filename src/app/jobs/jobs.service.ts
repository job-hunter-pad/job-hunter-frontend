import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import {JOBS} from '../mock-jobs'

@Injectable({
  providedIn: 'root'
})

export class JobsService {

  constructor() { }

  getJobs(){ 
    return of(JOBS);
  }
}
