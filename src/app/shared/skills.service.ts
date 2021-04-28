import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor() { }

  getSkills() {
    return of(['Fullstack Development', 'Graphic Design', 'Backend Development', 'Frontend Development', 'Cybersecurity', 'Cloud Computing', 'Machine Learning', 'Networking', 'Big Data', 'Algorithms']);
  }
}
