import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor() { }

  getSkills() {
    return of(['Fullstack Developer', 'Graphic Designer', 'Backend Developer', 'Frontend Developer']);
  }
}
